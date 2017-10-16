// ng dependencies
import { AfterViewInit, ApplicationRef, Component,  OnDestroy, OnInit,  ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// npm dependencies
import { ToastrService } from 'ngx-toastr';

// custom models
declare const $: any;

// custom services
import { ItemService } from './../../../services/item.service';
import { ThemeService } from './../../../services/theme.service';
import { TongueService } from './../../../services/tongue.service';

// custom models
import { Item } from '../../../models/item.models';
import { IItemCpntData } from './item.component.models';
// import { Theme } from '../../../shared/models/theme.models';

@Component({
	selector: 'app-modal-item',
	templateUrl: './item.component.html'
})
export class ItemComponent implements OnInit, OnDestroy, AfterViewInit {
	@ViewChild('selectThemes') selectThemesRef;
	@ViewChild('selectConflicts') selectConflictsRef;
	itemForm: FormGroup;
	jsonForm: FormGroup;
	cpntData: IItemCpntData = {
		isJSON: false,
		items: null,
		themes: null,
		selectedThemes: [],
		selectedConflicts: []
	};
	constructor (private formBuilder: FormBuilder, private toastrService: ToastrService,
		private itemService: ItemService, private themeService: ThemeService,
		private tongueService: TongueService, private appRef: ApplicationRef) {
	}

	ngOnInit () {
		// init item forms
		this.itemForm = this.formBuilder.group({
			uid: ['', Validators.required], validated: [false], img: [''],
			lvl: [0, Validators.compose([Validators.required, Validators.min(0), Validators.max(4)])],
			// theme?: Array<string>; - done appart
			en: this.formBuilder.group({
				wrd: ['', Validators.required],
				kk: this.formBuilder.group({ lo: [''], ipa: [''] }),
				kkEx: this.formBuilder.group({ lo: [''], ipa: [''] }),
				snd: [''],
				img: [''],
				ex: [''],
				meta: this.formBuilder.group({ plural: [''], feminine: [''], masculine: [''], comment: [''] })
			}),
			fr: this.formBuilder.group({
				wrd: ['', Validators.required],
				kk: this.formBuilder.group({ lo: [''], ipa: [''] }),
				kkEx: this.formBuilder.group({ lo: [''], ipa: [''] }),
				snd: [''],
				img: [''],
				ex: [''],
				meta: this.formBuilder.group({ isMale: [false], plural: [''], feminine: [''], masculine: [''], comment: ['']
				})
			}),
			lo: this.formBuilder.group({
				wrd: ['', Validators.required],
				kk: this.formBuilder.group({ fr: [''], en: [''], ipa: [''] }),
				kkEx: this.formBuilder.group({ fr: [''], en: [''], ipa: [''] }),
				snd: [''],
				img: [''],
				ex: [''],
				meta: this.formBuilder.group({ feminine: [''], masculine: [''], classifier: [''], comment: [''] })
			}),
			meta: this.formBuilder.group({
				illustratorUid: [''],
				owner: [''],
				ownerResource: [''],
				contrary: [''],
				displayArticle: [false],
				weight: [0]
				// conflict?: Array<string>; - done appart
			})
		});
		this.jsonForm = this.formBuilder.group({ jsonTextarea: ['', Validators.required] });
		this.cpntData.items = this.itemService.data;
		this.cpntData.themes = this.themeService.data;
	}

	get sameThemeItems (): Item[] {
		const sameThemeItems = this.cpntData.items.all.filter((item: Item) => {
			return this.cpntData.selectedThemes.some((theme: string) => {
				return item.themes.indexOf(theme) !== -1 &&
					(item.uid !== this.cpntData.items.current.uid);
			});
		});
		// console.log('item.component::sameThemeItems', sameThemeItems);
		return sameThemeItems;
	}

	ngAfterViewInit () {
		const that = this;
		$('#itemModal').on('shown.bs.modal', () => {
			// hack to manage bootstrap component - waiting for a stable BS 4 version
			setTimeout(() => {
				that.appRef.tick();
				that.setConflictsOptions();
			}, 0);
			that.setThemesOptions();
		});
	}

	ngOnDestroy () {
		$('#itemModal').off('shown.bs.modal');
		$('#commonOptions').off('shown.bs.collapse');
	}

	changeTab (isJSON: boolean) {
		this.cpntData.isJSON = isJSON;
		this.setThemesOptions();
		// this.setConflictsOptions();
	}

	createOrModify ({ value, valid }) {
		// console.log('item.component::createOfModify', this.cpntData.selectedThemes);
		if (valid) {
			const item: Item = this.cpntData.items.current;
			item.themes = this.cpntData.selectedThemes;
			item.meta.conflicts = this.cpntData.selectedConflicts;
			try {
				this.itemService[this.cpntData.items.current._id ? 'update' : 'create']([item]);
			} catch (e) {
				this.toastrService.error('@see browser console', 'Error while creating item ${item[0].uid}');
			}
		}
	}

	createItems ({ value, valid }) {
		// console.log('item.component::createItems', value);
		if (valid) {
			let items: Item[];
			try {
				items = JSON.parse(value.jsonTextarea);
				this.itemService.create(items);
			} catch (e) {
				this.toastrService.error('codebeautify.org/jsonviewer', 'Invalid JSON Array, @see: ');
			}
		}
	}

	changeThemes (options: HTMLOptionElement[]) {
		this.cpntData.selectedThemes = Array.apply(null, options)  // convert to real Array
			.filter((option: HTMLOptionElement) => option.selected)
			.map((option: HTMLOptionElement) => option.value);

		// remove conflicted by removed themes
		const meta = this.cpntData.items.current.meta;
		if (meta && meta.conflicts && meta.conflicts.length) {
			this.cpntData.selectedThemes.forEach((theme: string) => {
				meta.conflicts.forEach((conflictedItem, idx) => {
					const otherItem = this.cpntData.items.all.find((item: Item) => {
						return item.uid === conflictedItem;
					});
					if (otherItem.themes.indexOf(theme) === -1) {
						meta.conflicts.splice(idx, 1);
					}
				});
			});
		}
	}

	changeConflicts (options: HTMLOptionElement[]) {
		this.cpntData.selectedConflicts = Array.apply(null, options)  // convert to real Array
			.filter((option: HTMLOptionElement) => option.selected)
			.map((option: HTMLOptionElement) => option.value);
	}

	setThemesOptions () {
		// console.log('item.components::setThemesOptions', this.cpntData.items.current.themes);
		const itemThemes: string[] = this.cpntData.items.current.themes;
		this.cpntData.selectedThemes = Array.from(itemThemes);
		// this.updateSelectList(this.selectThemesRef, this.cpntData.selectedThemes);
		this.selectThemesRef.updateSelectList(this.cpntData.selectedThemes);
	}

	setConflictsOptions () {
		// console.log('item.components::setConflictsOptions');
		const meta = this.cpntData.items.current.meta;
		if (meta && meta.conflicts && meta.conflicts.length) {
			this.cpntData.selectedConflicts = Array.from(meta.conflicts as string[]);
			this.selectConflictsRef.updateSelectList(this.cpntData.selectedConflicts);
		}
	}

	generateLaonetics () {
		this.tongueService.generateLaonetics(this.itemService.data.current);
	}
}
