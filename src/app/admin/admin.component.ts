// ng dependencies
import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';

// npm dependencies
import { ToastrService } from 'ngx-toastr';
import 'rxjs/add/operator/filter';

// custom services
import { ThemeService } from './../shared-services/theme.service';
import { LanguageService } from './../shared-services/language.service';
import { ItemService } from './../shared-services/item.service';
import { ModalService } from './../shared-services/modal.service';

// custom pipes
// import { CapitalizePipe } from './../shared-pipes/capitalize.pipe';

// custom models
import { CreateHttpError, ReadHttpError, DeleteHttpError } from './../shared-models/error.models';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {
  cpntData = {
    lang: null,
    availableLang: null,
    theme: null,
    availableTheme: null,
    items: null
  };

  constructor (private themeService: ThemeService,
    private languageService: LanguageService,
    private itemService: ItemService,
    private toastrService: ToastrService,
    private modalService: ModalService) {
  }

  ngOnInit () {
    // init shared data
    this.cpntData.lang =  this.languageService.data;
    this.cpntData.availableLang = this.languageService.AVAILABLE_LANG;
    this.cpntData.theme =  this.themeService.data;
    this.cpntData.availableTheme = this.themeService.AVAILABLE_THEMES;
    this.cpntData.items = this.itemService.data;

    // init CRUD subscriptions
    // -- read
    this.itemService.error$.filter(error => error instanceof ReadHttpError).subscribe(error => {
      console.error('ReadHttpError', error);
    });

    // -- create
    this.itemService.create$.subscribe(data => {
      this.toastrService.success('Item created succesfully.');
    });
    this.itemService.error$.filter(error => error instanceof CreateHttpError)
    .subscribe( error => {
      if (error.code && error.toasterMessage) {
        this.toastrService.error(error.toasterMessage, 'Error n°' + error.code);
      }
    });

    // -- delete
    this.itemService.delete$.subscribe(data => {
      this.toastrService.success('Item succesfully deleted.');
    });
    this.itemService.error$.filter(error => error instanceof DeleteHttpError)
    .subscribe( error => {
      if (error.code && error.toasterMessage) {
        this.toastrService.error(error.toasterMessage, 'Error n°' + error.code);
      }
    });

    // get every words
    this.readItems();

  }

  readItems () {
    this.itemService.read();
  }

  confirmDelete (id) {
    this.modalService.setConfirmMethod(() => {
      this.itemService.delete(id);
    });
  }
}
