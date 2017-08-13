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


@NgModule({
   imports: [CommonModule, TranslateModule, FormsModule, ReactiveFormsModule],
   declarations: [SubmenuComponent, LoginComponent, ConfirmComponent, ItemComponent],
   providers: [],
   exports: [SubmenuComponent, LoginComponent, ConfirmComponent, ItemComponent],
})
export class SharedModule { }
