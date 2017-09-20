// ng dependencies
import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';

// npm dependencies
import { ToastrService } from 'ngx-toastr';
import 'rxjs/add/operator/filter';

// custom services
import { ApiService } from './../shared/services/api.service';
import { ThemeService } from './../shared/services/theme.service';
import { LanguageService } from './../shared/services/language.service';
import { ItemService } from './../shared/services/item.service';
import { ModalService } from './../shared/services/modal.service';
import { VersionService } from './../shared/services/version.service';

// custom models
import { CreateHttpError, ReadHttpError, UpdateHttpError, DeleteHttpError } from './../shared/models/error.models';
import { Item } from './../shared/models/item.models';
import { Theme } from './../shared/models/theme.models';
declare const $: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {
  cpntData = {
    lang: null,
    items: null,
    themes: null,
    tabSection: 0
  };

  constructor (private themeService: ThemeService,
    private languageService: LanguageService,
    private itemService: ItemService,
    private toastrService: ToastrService,
    private modalService: ModalService,
    private apiService: ApiService,
    private versionService: VersionService) {
  }

  ngOnInit () {
    // init shared data
    this.cpntData.lang =  this.languageService.data;
    this.cpntData.themes = this.themeService.data;
    this.cpntData.items = this.itemService.data;

    // init CRUD subscriptions
    // -- read
    this.itemService.error$.filter(error => error instanceof ReadHttpError).subscribe(error => {
      console.error('ReadHttpError', error);
    });

    // -- create
    this.itemService.create$.subscribe(data => {
      this.displaySuccess('Item created', true);
    });
    this.itemService.error$.filter(error => error instanceof CreateHttpError)
    .subscribe(this.displayBasicError);
    this.themeService.create$.subscribe(data => {
      this.displaySuccess('Theme created', false);
    });
    this.themeService.error$.filter(error => error instanceof CreateHttpError)
    .subscribe(this.displayBasicError);

    // -- update
    this.itemService.update$.subscribe(data => {
      this.displaySuccess('Item updated', true);
    });
    this.itemService.error$.filter(error => error instanceof UpdateHttpError)
    .subscribe(this.displayBasicError);
    this.themeService.update$.subscribe(data => {
      this.displaySuccess('Theme updated', true);
    });
    this.themeService.error$.filter(error => error instanceof UpdateHttpError)
    .subscribe(this.displayBasicError);

    // -- delete
    this.itemService.delete$.subscribe(data => {
      this.toastrService.success('Item succesfully deleted.');
    });
    this.itemService.error$.filter(error => error instanceof DeleteHttpError)
    .subscribe(this.displayBasicError);
    this.themeService.delete$.subscribe(data => {
      this.toastrService.success('Theme succesfully deleted.');
    });
    this.itemService.error$.filter(error => error instanceof DeleteHttpError)
    .subscribe(this.displayBasicError);

    // finally, retrieve all items
    this.itemService.read();
  }

  restoreVersion () {
    this.apiService.getResources('api/version/restore', true).subscribe((data) => {
      console.log(data);
    });
  }

  displayBasicError (error: any) {
    if (error.code && error.toasterMessage) {
      this.toastrService.error(error.toasterMessage, 'Error n°' + error.code);
    }
  }

  displaySuccess (msg: string, isItem: boolean) {
    this.toastrService.success(msg + ' successfully.');
    $(isItem ? '#itemModal' : '#themeModal').modal('hide');
    this[isItem  ? 'itemService' : 'themeService'].data.current = isItem ? new Item() : new Theme();
  }

  createEmptyTheme () {
    this.cpntData.themes.current = new Theme();
  }

  createEmptyItem () {
    this.cpntData.items.current = new Item();
  }

  confirmDeleteItem (id: string, event) {
    this.modalService.setConfirmMethod(() => {
      this.itemService.delete(id);
    });
  }
  confirmDeleteTheme (id: string, event) {
    this.modalService.setConfirmMethod(() => {
      this.themeService.delete(id);
    });
  }

  createVersion () {
    this.versionService.create();
  }

  updateVersion () {
    this.versionService.update();
  }

  deleteVersion () {
    this.versionService.delete();
  }
}
