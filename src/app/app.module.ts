// ng dependencies
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UrlSerializer } from '@angular/router';

// npm dependencies
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ToastrModule } from 'ngx-toastr';

// custom modules
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

// custom components
import { AppComponent } from './app.component';

// custom services
import { AdminActivationService } from './shared/services/admin-activation.service';
import { ApiService } from './shared/services/api.service';
import { ItemService } from './shared/services/item.service';
import { LanguageService } from './shared/services/language.service';
import { LaoneticsService } from './shared/services/laonetics.service';
import { ModalService } from './shared/services/modal.service';
import { SeoService } from './shared/services/seo.service';
import { StorageService } from './shared/services/storage.service';
import { ThemeService } from './shared/services/theme.service';
import { TongueService } from './shared/services/tongue.service';
import { UserService } from './shared/services/user.service';
import { VersionService } from './shared/services/version.service';

// custom others
import { CustomUrlSerializer } from './shared/others/CustomUrlSerializer';

export function HttpLoaderFactory (http: HttpClient) {
	return new TranslateHttpLoader(http, '/assets/locales/', '.json');
}

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		HttpModule,
		HttpClientModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [ HttpClient ]
			}
		}),
		AppRoutingModule,
		SharedModule,
		CommonModule,
		BrowserAnimationsModule, // required by ToastrModule
		ToastrModule.forRoot({
			// timeOut: 100000
		})
	],
	providers: [
		{ provide: UrlSerializer, useClass: CustomUrlSerializer },
		AdminActivationService,
		ApiService,
		ItemService,
		LanguageService,
		LaoneticsService,
		ModalService,
		SeoService,
		StorageService,
		ThemeService,
		TongueService,
		TranslateService,
		UserService,
		VersionService
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
