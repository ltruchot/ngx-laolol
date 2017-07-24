// ng dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// npm dependencies
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

// custom components
import { SubmenuComponent } from './submenu/submenu.component';
import { LoginComponent } from './modals/login/login.component';

@NgModule({
   imports: [CommonModule, TranslateModule, FormsModule, ReactiveFormsModule],
   declarations: [SubmenuComponent, LoginComponent],
   providers: [],
   exports: [SubmenuComponent, LoginComponent],
})
export class SharedModule { }
