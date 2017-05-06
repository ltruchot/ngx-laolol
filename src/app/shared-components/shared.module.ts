// ng dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// npm dependencies
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

// custom components
import { SubmenuComponent } from './../shared-components/submenu/submenu.component';

@NgModule({
   imports: [CommonModule, TranslateModule],
   declarations: [SubmenuComponent],
   providers: [],
   exports: [SubmenuComponent],
})
export class SharedModule { }
