// ng dependencies
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { CommonModule } from '@angular/common';

// npm dependencies
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// custom modules
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared-components/shared.module';

// custom components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

// custom services
import { AdminActivationService } from './shared-services/admin-activation.service';
import { ApiService } from './shared-services/api.service';
import { ItemService } from './shared-services/item.service';
import { LanguageService } from './shared-services/language.service';
import { StorageService } from './shared-services/storage.service';
import { ThemeService } from './shared-services/theme.service';
import { UserService } from './shared-services/user.service';

// language export for AOT build
export function createTranslateLoader(http: Http) {
    return new TranslateHttpLoader(http, './assets/locales/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    SharedModule,
    CommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    })
  ],
  providers: [
    AdminActivationService,
    ApiService,
    ItemService,
    LanguageService,
    StorageService,
    ThemeService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
