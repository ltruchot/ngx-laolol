// ng dependencies
import { Component, OnDestroy, OnInit } from '@angular/core';
// import { Router } from '@angular/router';

// npm dependencies
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';

// custom services
import { ApiService } from './../shared/services/api.service';
import { ThemeService } from './../shared/services/theme.service';
import { LanguageService } from './../shared/services/language.service';
import { ItemService } from './../shared/services/item.service';
import { ModalService } from './../shared/services/modal.service';
import { VersionService } from './../shared/services/version.service';

// custom models
import {
	CreateHttpError,
	DeleteHttpError,
	HttpError,
	ReadHttpError,
	UpdateHttpError
} from './../shared/models/error.models';
import { Item } from './../shared/models/item.models';
import { Theme } from './../shared/models/theme.models';
declare const $: any;

// custom components
import { LaololComponent } from './../shared/components/abstract/laolol.component';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html'
})
export class AdminComponent extends LaololComponent implements OnInit, OnDestroy {
	cpntData = {
		tabSection: 0,
		selectedFilter: 'all'
	};
	subscriptions: Subscription[] = [];

	constructor (private toastrService: ToastrService,
		private modalService: ModalService,
		private apiService: ApiService,
		private versionService: VersionService,
		itemService: ItemService, languageService: LanguageService, themeService: ThemeService) {
		super(itemService, languageService, themeService);
	}

	ngOnInit () {
		// init CRUD subscriptions
		const initialSubscriptions = [
			// -- read
			this.itemService.error$
				.filter((error: HttpError)  => error instanceof ReadHttpError)
				.subscribe((error: ReadHttpError) => console.error('ReadHttpError', error)),

			// -- create
			this.itemService.create$.subscribe(() => this.displaySuccess('Item created', true)),
			this.itemService.error$
				.filter((error: HttpError) => error instanceof CreateHttpError)
				.subscribe(this.displayBasicError),
			this.themeService.create$.subscribe(() => this.displaySuccess('Theme created', false)),
			this.themeService.error$
				.filter((error: HttpError)  => error instanceof CreateHttpError)
				.subscribe(this.displayBasicError),

			// -- update
			this.itemService.update$.subscribe(() => this.displaySuccess('Item updated', true)),
			this.itemService.error$
				.filter((error: HttpError) => error instanceof UpdateHttpError)
				.subscribe(this.displayBasicError),
			this.themeService.update$.subscribe(() => this.displaySuccess('Theme updated', true)),
			this.themeService.error$
				.filter((error: HttpError) => error instanceof UpdateHttpError)
				.subscribe(this.displayBasicError),

			// -- delete
			this.itemService.delete$.subscribe(() => this.toastrService.success('Item succesfully deleted.')),
			this.itemService.error$
				.filter((error: HttpError) => error instanceof DeleteHttpError)
				.subscribe(this.displayBasicError),
			this.themeService.delete$.subscribe(() => this.toastrService.success('Theme succesfully deleted.')),
			this.itemService.error$
				.filter((error: HttpError) => error instanceof DeleteHttpError)
				.subscribe(this.displayBasicError)
		];
		this.subscriptions.push(...initialSubscriptions);

		// finally, retrieve all items
		this.itemService.read();
	}

	ngOnDestroy () {
		this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
	}

	get filteredItems () {
		// console.log('admin.service::get filteredItems', this.cpntData.selectedFilter)
		if (this.cpntData.selectedFilter === 'all') {
			return this.itemData.all;
		} else if (this.cpntData.selectedFilter === 'none') {
			return this.itemData.all.filter((item) => {
			return item.themes.length === 0;
		});
		}
		return this.itemData.all.filter((item) => {
			return item.themes.indexOf(this.cpntData.selectedFilter) !== -1;
		});
	}

	changeFilter (val: string) {
		this.cpntData.selectedFilter = val;
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
		this.themeData.current = new Theme();
	}

	createEmptyItem () {
		this.itemData.current = new Item();
	}

	confirmDeleteItem (id: string) {
		this.modalService.setConfirmMethod(() => {
			this.itemService.delete(id);
		});
	}
	confirmDeleteTheme (id: string) {
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
