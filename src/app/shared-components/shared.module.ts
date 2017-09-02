// ng dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// npm dependencies
import { TranslateModule } from '@ngx-translate/core';

// custom components
import { ConfirmComponent } from './modals/confirm/confirm.component';
import { ItemComponent } from './modals/item/item.component';
import { LoginComponent } from './modals/login/login.component';
import { SubmenuComponent } from './submenu/submenu.component';
import { ThemeComponent } from './modals/theme/theme.component';


@NgModule({
   imports: [CommonModule, TranslateModule, FormsModule, ReactiveFormsModule],
   declarations: [SubmenuComponent, LoginComponent, ConfirmComponent, ItemComponent, ThemeComponent],
   providers: [],
   exports: [SubmenuComponent, LoginComponent, ConfirmComponent, ItemComponent, ThemeComponent],
})
export class SharedModule { }
