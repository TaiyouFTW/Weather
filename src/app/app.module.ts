import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';


// Core Folder
import { ErrorInterceptor } from '@core/interceptors/error.interceptor';

// FontAwesome
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSpinner as faSpinner } from '@fortawesome/free-solid-svg-icons'; // Solid
import { faSun as faSun } from '@fortawesome/free-solid-svg-icons'; // Solid
import { faMoon as faMoon } from '@fortawesome/free-solid-svg-icons'; // Solid
import { faCoffee as faCoffee } from '@fortawesome/free-solid-svg-icons'; // Solid
import { faHeart as faHeart } from '@fortawesome/free-solid-svg-icons'; // Solid

// Components
import { AppComponent } from './app.component';
import { LoadingComponent } from '@shared/_loading/loading.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';;


@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faSpinner, faSun, faMoon, faCoffee, faHeart);
  }
}