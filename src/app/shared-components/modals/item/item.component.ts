// ng dependencies
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// npm dependencies
import { ToastrService } from 'ngx-toastr';

// custom models
// declare const $: any;

// custom services
import { ItemService } from './../../../shared-services/item.service';

// custom models
import { Item } from '../../../shared-models/item.models';

@Component({
  selector: 'app-modal-item',
  templateUrl: './item.component.html'
})
export class ItemComponent implements OnInit {
  itemForm: FormGroup;
  jsonForm: FormGroup;
  cpntData = {
    isJSON: false,
    items: null
  };
  constructor(private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private itemService: ItemService) { }

  ngOnInit() {
    // init item forms
     // init item form
    this.itemForm = this.formBuilder.group({
      uid: ['', Validators.required],
      enWrd: ['', Validators.required],
      enSnd: [''],
      enKkLo: ['']
    });
    this.jsonForm = this.formBuilder.group({
      jsonTextarea: ['', Validators.required]
    });
    this.cpntData.items = this.itemService.data;
  }

  createOrModify ({ value, valid }) {
    if (valid) {
      // this.userService.item(value, () => {
      //   $('#itemModal').modal('hide');
      // });
    }
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
};
