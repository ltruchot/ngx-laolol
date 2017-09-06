// ng dependencies
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// npm dependencies
import { ToastrService } from 'ngx-toastr';

// custom models
declare const $: any;

// custom services
import { ItemService } from './../../../shared-services/item.service';
import { ThemeService } from './../../../shared-services/theme.service';

// custom models
import { Item } from '../../../shared-models/item.models';
// import { Theme } from '../../../shared-models/theme.models';

@Component({
  selector: 'app-modal-item',
  templateUrl: './item.component.html'
})
export class ItemComponent implements OnInit {
  @ViewChild('selectThemes') selectElRef;
  itemForm: FormGroup;
  jsonForm: FormGroup;
  cpntData = {
    isJSON: false,
    items: null,
    themes: null,
    selectedThemes: []
  };
  constructor(private formBuilder: FormBuilder, private toastrService: ToastrService,
    private itemService: ItemService, private themeService: ThemeService) { }

  ngOnInit() {
    // init item forms
    this.itemForm = this.formBuilder.group({
      uid: ['', Validators.required],
      validated: [false, Validators.required],
      img: [''],
      imgAuthor: [''],
      imgResource: [''],
      lvl: [0, Validators.compose([Validators.required, Validators.min(0), Validators.max(4)])],
      en: this.formBuilder.group({
        wrd: ['', Validators.required],
        kk: this.formBuilder.group({
          lo: [''],
          ipa: ['']
        }),
        snd: [''],
        img: [''],
        ex: [''],
        meta: this.formBuilder.group({
          plural: [''],
          feminine: [''],
          masculine: [''],
          comment: ['']
        })
      }),
      fr: this.formBuilder.group({
        wrd: ['', Validators.required],
        kk: this.formBuilder.group({
          lo: [''],
          ipa: [''],
        }),
        snd: [''],
        img: [''],
        ex: [''],
        meta: this.formBuilder.group({
          isMale: [false],
          plural: [''],
          feminine: [''],
          masculine: [''],
          comment: ['']
        })
      }),
      lo: this.formBuilder.group({
        wrd: ['', Validators.required],
        kk: this.formBuilder.group({
          fr: [''],
          en: [''],
          ipa: ['']
        }),
        snd: [''],
        img: [''],
        ex: [''],
        meta: this.formBuilder.group({
          feminine: [''],
          masculine: [''],
          classifier: [''],
          comment: ['']
        })
      })
    });
    this.jsonForm = this.formBuilder.group({
      jsonTextarea: ['', Validators.required]
    });
    this.cpntData.items = this.itemService.data;
    this.cpntData.themes = this.themeService.data;
  }

  createOrModify ({ value, valid }) {
    if (valid) {
      let item: Item = this.cpntData.items.current;
      try {
        this.itemService[this.cpntData.items.current._id ? 'update' : 'create']([item]);
      } catch (e) {
        this.toastrService.error('@see browser console', 'Error while creating ${items[0].uid}');
      }
    }
  }

  ngAfterViewInit () {
    const that = this;
    $('#itemModal').on('shown.bs.modal', (e) => {
      that.setThemesOptions();
    });
  }

  ngOnDestroy () {
    $('#itemModal').off('shown.bs.modal');
  }

  createItems ({ value, valid }) {
    console.log('admin.component::createItems', value);
    if (valid) {
      let items: Array<Item>;
      try {
        items = JSON.parse(value.jsonTextarea);
        this.itemService.create(items);
      } catch (e) {
        this.toastrService.error('codebeautify.org/jsonviewer', 'Invalid JSON Array, @see: ');
      }
    }
  }

  updateSelectList() {
    let options = this.selectElRef.nativeElement.options;
    for (let i = 0; i < options.length; i++) {
      options[i].selected = this.cpntData.selectedThemes.indexOf(options[i].value) > -1;
    }
  }

  changeThemes(options) {
    this.cpntData.selectedThemes = Array.apply(null, options)  // convert to real Array
      .filter(option => option.selected)
      .map(option => option.value);
    console.log(this.cpntData.selectedThemes);
  }

  setThemesOptions() {
    console.log('item.components::setThemesOptions', this.cpntData.items.current.themes);
    this.cpntData.selectedThemes = Array.from(this.cpntData.items.current.themes);
    this.updateSelectList();
  }
};
