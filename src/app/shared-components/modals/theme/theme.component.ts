// ng dependencies
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// npm dependencies
import { ToastrService } from 'ngx-toastr';

// custom models
// declare const $: any;

// custom services
import { ThemeService } from './../../../shared-services/theme.service';

// custom models
import { Theme } from '../../../shared-models/theme.models';

@Component({
  selector: 'app-modal-theme',
  templateUrl: './theme.component.html'
})
export class ThemeComponent implements OnInit {
  jsonForm: FormGroup;
  cpntData = {
    themes: null
  };
  constructor(private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private themeService: ThemeService) { }

  ngOnInit() {
    // init themes forms
    this.jsonForm = this.formBuilder.group({
      jsonTextarea: ['', Validators.required]
    });
    this.cpntData.themes = this.themeService.data;
  }

  createOrModify ({ value, valid }) {
    if (valid) {
      // this.userService.theme(value, () => {
      //   $('#themeModal').modal('hide');
      // });
    }
  }

  createThemes ({ value, valid }) {
    console.log('admin.component::createThemes', value);
    if (valid) {
      let themes: Array<Theme>;
      try {
        themes = JSON.parse(value.jsonTextarea);
        this.themeService.create(themes);
      } catch (e) {
        this.toastrService.error('codebeautify.org/jsonviewer', 'Invalid JSON Array, @see: ');
      }
    }
  }
};
