// ng dependencies
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpClient, HttpClientModule } from '@angular/common/http';

// npm dependencies
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// custom modules
import { AppRoutingModule } from '@app/app.routing.module';
import { CoreModule } from '@core/core.module';

// custom components
import { AppComponent } from '@app/app.component';

// custom values
import { environment } from '@env/environment';

// AoT requires an exported function for factories
export function HttpLoaderFactory (http: HttpClient): TranslateHttpLoader {
	return new TranslateHttpLoader(http);
}

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		AppRoutingModule,
		CoreModule,
		BrowserModule,
		HttpClientModule,
		ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient]
			}
		})
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
