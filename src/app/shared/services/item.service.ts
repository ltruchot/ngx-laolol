// ng dependencies
import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';

// npm dependencies
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

// custom services
import { ApiService } from './api.service';
import { StorageService } from './storage.service';
import { TongueService } from './tongue.service';
import { UserService } from './user.service';

// custom models
import {
	CreateHttpError,
	DeleteHttpError,
	HttpError,
	ManagedCodeErrors,
	ReadHttpError,
	UpdateHttpError

} from '../models/error.models';
import {  Item } from '../models/item.models';
import { IItemServiceData, IItemsResponse } from '../models/services-data.models';

@Injectable()
export class ItemService {
	create$: Observable<any>;
	read$: Observable<IItemsResponse>;
	update$: Observable<void>;
	delete$: Observable<any>;
	error$: Observable<HttpError>;

	public data: IItemServiceData = {
		current: new Item(),
		all: []
	};
	protected createSubject: Subject<any>;
	protected readSubject: Subject<IItemsResponse>;
	protected updateSubject: Subject<any>;
	protected deleteSubject: Subject<any>;
	protected errorSubject: Subject<HttpError>;
	private basicUrl = 'api/items';
	private basicCodeErrors: ManagedCodeErrors;

	constructor (private apiService: ApiService, private userService: UserService,
		private storage: StorageService, private tongueService: TongueService)  {
		// create
		this.createSubject = new Subject();
		this.create$ = this.createSubject.asObservable();

		// read
		this.readSubject = new Subject();
		this.read$ = this.readSubject.asObservable();

		// update
		this.updateSubject = new Subject();
		this.update$ = this.updateSubject.asObservable();

		// delete
		this.deleteSubject = new Subject();
		this.delete$ = this.deleteSubject.asObservable();

		// errors
		this.errorSubject = new Subject();
		this.error$ = this.errorSubject.asObservable();
		this.basicCodeErrors = this.getBasicCodeErrors();
	}

	initialize () {
		// populate data with storage
		const items = this.storage.getItem('allItems');
		if (items && items.length) {
			this.pushAndSortItems(items);
		}
	}

	getBasicCodeErrors (): ManagedCodeErrors  {
		return {
			'400': (): string => {
				return 'Items format is invalid.';
			},
			'401': (): string => {
				this.userService.logout();
				return 'User authentification failed. Please, try to reconnect.';
			},
			'500': (): string => {
				return 'Server is probably down.';
			}
		};
	}
	/*
	 * @desc push items in global object and re-sort it by alphanumerical order
	 */

	pushAndSortItems (data: Array<Item>) {
		// console.log('item.service::pushAndSortItems', data);
		data.forEach(item => {
			// compensate lack of data for some old items
			item.meta = item.meta || {};
			item.lo.kk = item.lo.kk || {};
			item.lo.kkEx = item.lo.kkEx || {};
			item.lo.meta = item.lo.meta || {};
			item.fr.kk = item.fr.kk || {};
			item.fr.kkEx = item.fr.kkEx || {};
			item.fr.meta = item.fr.meta || {};
			item.en.kk = item.en.kk || {};
			item.en.kkEx = item.en.kkEx || {};
			item.en.meta = item.en.meta || {};
		});
		this.data.all.push(...data);
		this.sortAndSaveItems();
	}

	modifyAndSortItems (data: Item) {
		let modifiedItem = this.data.all.find(item => {
			return item._id === data._id;
		});
		if (modifiedItem) {
			modifiedItem = data;
		}
		this.sortAndSaveItems();
	}

	sortAndSaveItems () {
		this.data.all.sort((a, b) => {
			return (a.uid > b.uid) ? 1 : ((b.uid > a.uid) ? -1 : 0);
		});
		this.storage.setItem('allItems', this.data.all);
	}

	create (items: Item[]): void {
		this.apiService.postResources(this.basicUrl, items, true).catch(error => {
			return Observable.throw(new CreateHttpError(error, this.basicUrl, this.basicCodeErrors));
		}).subscribe((data: Item[]) => {
			data.forEach((item: Item) => {
				this.tongueService.enhanceItem(item);
			});
			this.pushAndSortItems(data);
			return this.createSubject.next(data);
		}, (createHttpError: CreateHttpError) => {
			console.error('createHttpError', createHttpError.message);
			return this.errorSubject.next(createHttpError);
		});
	}

	update (items: Array<Item>): void {
		this.apiService.putResources(this.basicUrl + `/${items[0]._id}`, items[0], true).catch(error => {
			return Observable.throw(new UpdateHttpError(error, this.basicUrl, this.basicCodeErrors));
		}).subscribe((data: Item) => {
			this.modifyAndSortItems(data);
			return this.updateSubject.next(data);
		}, updateHttpError => {
			console.error('updateHttpError', updateHttpError.message);
			return this.errorSubject.next(updateHttpError);
		});
	}

	resetItems () {
		// console.log('item.service::resetItems');
		this.storage.removeItem('allItems');
	}
	/*
	 *  @desc modify stream of the read$ Observable.
	 *  If theme exist in dataset 'all', send it as "next"
	 *  It not, do the server request, excluding already loaded themes
	 */
	read (themeUid?: string): any {
		// console.log('item.service::read', themeUid);
		// get list of already loaded themes
		let excludeList = this.storage.getItem('loadedThemes') || '';

		// if current themes (or all themes) is already loaded
		if (excludeList && (excludeList === 'all' || excludeList.split(',').indexOf(themeUid) !== -1)) {
			// return a filtered set by uid
			if (themeUid) {
				const filtredData = this.data.all.filter(item => {
					return item.themes.indexOf(themeUid) !== -1;
				});
				return this.readSubject.next({ data: filtredData, theme: themeUid});
			// or the complete set if no uid specified
			} else {
				return this.readSubject.next({ data: this.data.all, theme: 'all'});
			}
		// if needed, prepare exclude list as param
		} else {
			// prepare GET params ?includes=theme&excludes=theme
			let searchParams = new URLSearchParams();
			searchParams.set('includes', themeUid ? themeUid : 'all');
			if (excludeList) {
				searchParams.set('excludes', excludeList);
			}

			// launch GET request
			return this.apiService.getResources(this.basicUrl, false, searchParams).catch(error => {
				return Observable.throw(new ReadHttpError(error, this.basicUrl, this.basicCodeErrors));
			}).subscribe(data => {
				data.forEach(item => {
					this.tongueService.enhanceItem(item);
				});
				// store and sort items;
				this.pushAndSortItems(data);
				// store new theme in exclude list
				if (themeUid) {
					this.storage.setItem('loadedThemes', excludeList ? excludeList + ',' + themeUid : themeUid);
				} else {
					this.storage.setItem('loadedThemes', 'all');
				}
				// return current data set
				return this.readSubject.next({ data: data, theme: themeUid || 'all'});
			}, readHttpError => {
				console.error('readHttpError', readHttpError.message);
				return this.errorSubject.next(readHttpError);
			});
		}
	}

	delete (id: string): void {
		this.apiService.deleteResources(this.basicUrl + '/' + id, true).catch(error => {
			return Observable.throw(new DeleteHttpError(error, this.basicUrl, this.basicCodeErrors));
		}).subscribe(data => {
			this.data.all.splice(this.data.all.findIndex(item => item._id === id), 1);
			this.sortAndSaveItems();
			return this.deleteSubject.next(data);
		}, deleteHttpError => {
			return this.errorSubject.next(deleteHttpError);
		});
	}
}
