// ng dependencies
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// npm dependencies
import { ToastrModule } from 'ngx-toastr';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// custom modules
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

// custom components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

// custom services
import { AdminActivationService } from './shared/services/admin-activation.service';
import { ApiService } from './shared/services/api.service';
import { ItemService } from './shared/services/item.service';
import { LanguageService } from './shared/services/language.service';
import { LaoneticsService } from './shared/services/laonetics.service'
import { ModalService } from './shared/services/modal.service';
import { StorageService } from './shared/services/storage.service';
import { ThemeService } from './shared/services/theme.service';
import { TongueService } from './shared/services/tongue.service';
import { UserService } from './shared/services/user.service';
import { VersionService } from './shared/services/version.service';

// language export for AOT build
export function HttpLoaderFactory (http: HttpClient) {
	return new TranslateHttpLoader(http);
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
		HttpClientModule,
		AppRoutingModule,
		SharedModule,
		CommonModule,
		BrowserAnimationsModule, // required by ToastrModule
		ToastrModule.forRoot({
			// timeOut: 100000
		}),
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient]
			}
		})
	],
	providers: [
		AdminActivationService,
		ApiService,
		ItemService,
		LanguageService,
		LaoneticsService,
		ModalService,
		StorageService,
		ThemeService,
		TongueService,
		UserService,
		VersionService
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
