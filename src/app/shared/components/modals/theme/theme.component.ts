// ng dependencies
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// npm dependencies
import { ToastrService } from 'ngx-toastr';

// custom models
// declare const $: any;

// custom services
import { ThemeService } from './../../../services/theme.service';
import { ItemService } from './../../../services/item.service';

// custom models
import { Theme } from '../../../models/theme.models';

@Component({
	selector: 'app-modal-theme',
	templateUrl: './theme.component.html'
})
export class ThemeComponent implements OnInit {
	themeForm: FormGroup;
	jsonForm: FormGroup;
	cpntData = {
		themes: null,
		isJSON: false
	};
	constructor (private formBuilder: FormBuilder, private toastrService: ToastrService,
		private themeService: ThemeService, private itemService: ItemService) { }

	ngOnInit () {
		// init theme form
		this.themeForm = this.formBuilder.group({
			uid: ['', Validators.required],
			linkUid: ['', Validators.required],
			// theme?: Array<string>; - done appart
			en: this.formBuilder.group({
				desc0: [''],
				desc1: [''],
				desc2: ['']
			}),
			fr: this.formBuilder.group({
				desc0: [''],
				desc1: [''],
				desc2: ['']
			}),
			lo: this.formBuilder.group({
				desc0: [''],
				desc1: [''],
				desc2: ['']
			}),
			displayPlural: [false],
			isBasic: [false],
			isLaoAlphabet: [false],
			hasImages: [false],
			hasSpecialExample: [false],
			noArticle: [false],
			noKaraoke: [false],
			noPlural: [false],
			levels: [1],
			laoClassifierUid: [''],
			isVisible: [false],
			validated: [false]
		});
		// init themes json form
		this.jsonForm = this.formBuilder.group({
			jsonTextarea: ['', Validators.required]
		});
		this.cpntData.themes = this.themeService.data;
	}

	createOrModify ({ value, valid }) {
		// console.log('theme.service::createOrModify');
		if (valid) {
			const theme: Theme = this.cpntData.themes.current;
			if (this.itemService.data.all.find(item => item.uid === theme.linkUid)) {
				try {
					this.themeService[this.cpntData.themes.current._id ? 'update' : 'create']([theme]);
				} catch (e) {
					this.toastrService.error('@see browser console', `Error while creating theme ${theme.uid}`);
				}
			} else {
				this.toastrService.error(`${theme.linkUid} is not a known item`, `Error while creating theme ${theme.uid}`);
			}
		}
	}

	createThemes ({ value, valid }) {
		console.log('admin.component::createThemes', value);
		if (valid) {
			let themes: Theme[];
			try {
				themes = JSON.parse(value.jsonTextarea);
				this.themeService.create(themes);
			} catch (e) {
				this.toastrService.error('codebeautify.org/jsonviewer', 'Invalid JSON Array, @see: ');
			}
		}
	}
}
