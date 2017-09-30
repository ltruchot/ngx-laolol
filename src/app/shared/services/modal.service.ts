// ng dependencies
import { Injectable } from '@angular/core';

// npm dependencies
// import { Observable } from 'rxjs/Observable';

@Injectable()
export class ModalService {
	confirmMethod: Function;
	data = {
		user: null
	};
	constructor () {}

	setConfirmMethod (method: Function) {
		this.confirmMethod = () => {
			method();
			this.confirmMethod = null;
		};
	}
}
