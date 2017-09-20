// ng dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// npm dependencies
import { TranslateModule } from '@ngx-translate/core';

// custom components
import { ConfirmComponent } from './components/modals/confirm/confirm.component';
import { ItemComponent } from './components/modals/item/item.component';
import { LoginComponent } from './components/modals/login/login.component';
import { SubmenuComponent } from './components/submenu/submenu.component';
import { ThemeComponent } from './components/modals/theme/theme.component';
import { MultiselectComponent } from './components/forms/multiselect/multiselect.component';

// custom pipes
import { CapitalizePipe } from './pipes/capitalize.pipe';


@NgModule({
   imports: [CommonModule, TranslateModule, FormsModule, ReactiveFormsModule],
   declarations: [SubmenuComponent, LoginComponent, ConfirmComponent,
   ItemComponent, ThemeComponent, MultiselectComponent, CapitalizePipe],
   providers: [],
   exports: [SubmenuComponent, LoginComponent, ConfirmComponent,
   ItemComponent, ThemeComponent, MultiselectComponent, CapitalizePipe],
})
export class SharedModule { }
