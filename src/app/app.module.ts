import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Modules
import { AppRoutingModule } from './app-routing.module';

// Core Folder
import { ErrorInterceptor } from '@core/interceptors/error.interceptor';

// FontAwesome
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { far } from '@fortawesome/free-regular-svg-icons'; // Regular
import { fas } from '@fortawesome/free-solid-svg-icons'; // Solid

// Angular material
// import { MatToolbarModule } from '@angular/material';

// Components
import { AppComponent } from './app.component';
import { LoadingComponent } from '@shared/_loading/loading.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(far, fas);
  }
}