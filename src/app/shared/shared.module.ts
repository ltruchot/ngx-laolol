// ng dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// npm dependencies
import { TranslateModule } from '@ngx-translate/core';
import { LocalizeRouterModule } from 'localize-router';

// custom components
import { ConfirmComponent } from './components/modals/confirm/confirm.component';
import { ItemComponent } from './components/modals/item/item.component';
import { LoginComponent } from './components/modals/login/login.component';
import { SubmenuComponent } from './components/submenu/submenu.component';
import { ThemeComponent } from './components/modals/theme/theme.component';
import { MultiselectComponent } from './components/forms/multiselect/multiselect.component';

// custom pipes
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';
import { UnbreakablePipe } from './pipes/unbreakable.pipe';

@NgModule({
	imports: [CommonModule, TranslateModule, FormsModule, ReactiveFormsModule, LocalizeRouterModule, RouterModule],
	declarations: [SubmenuComponent, LoginComponent, ConfirmComponent,
	ItemComponent, ThemeComponent, MultiselectComponent, CapitalizePipe, TruncatePipe, UnbreakablePipe],
	providers: [],
	exports: [SubmenuComponent, LoginComponent, ConfirmComponent,
	ItemComponent, ThemeComponent, MultiselectComponent, CapitalizePipe, TruncatePipe, UnbreakablePipe]
})
export class SharedModule { }
