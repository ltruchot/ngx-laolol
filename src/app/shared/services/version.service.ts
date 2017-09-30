// ng dependencies
import { Injectable } from '@angular/core';

// npm dependencies
import { Observable } from 'rxjs/Observable';

// custom services
import { ApiService } from './api.service';

@Injectable()
export class VersionService {
	private versionUrl = 'api/version';
	constructor(private apiService: ApiService) {
	}

	create () {
		this.apiService.postResources(this.versionUrl, null, true).catch(error => {
			return Observable.throw(new Error());
		}).subscribe((version: any) => {
			window.location.reload();
		}, err => {
			console.error('createVersion ERROR:', err);
		});
	}

	update () {
		this.apiService.putResources(this.versionUrl, null, true).catch(error => {
			return Observable.throw(new Error());
		}).subscribe((version: any) => {
			window.location.reload();
		}, err => {
			console.error('updateVersion ERROR:', err);
		});
	}

	delete () {
	 this.apiService.deleteResources(this.versionUrl, true).catch(error => {
			return Observable.throw(new Error());
		}).subscribe((version: any) => {
			console.log(version);
		}, err => {
			console.error('deleteVersion ERROR:', err);
		});
	}
}
