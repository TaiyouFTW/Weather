import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular material
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

// FontAwesome
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSnowflake as faSnowflake } from '@fortawesome/free-solid-svg-icons'; // Solid
import { faCloudMeatball as faCloudMeatball } from '@fortawesome/free-solid-svg-icons'; // Solid
import { faBolt as faBolt } from '@fortawesome/free-solid-svg-icons'; // Solid
import { faCloudShowersHeavy as faCloudShowersHeavy } from '@fortawesome/free-solid-svg-icons'; // Solid
import { faCloudRain as faCloudRain } from '@fortawesome/free-solid-svg-icons'; // Solid
import { faPooStorm as faPooStorm } from '@fortawesome/free-solid-svg-icons'; // Solid
import { faCloud as faCloud } from '@fortawesome/free-solid-svg-icons'; // Solid
import { faCloudSun as faCloudSun } from '@fortawesome/free-solid-svg-icons'; // Solid

import { HomeRoutingModule } from './home-routing.module';
import { WeatherComponent } from './weather/weather.component';
import { SearchComponent } from './search/search.component';


@NgModule({
  declarations: [
    WeatherComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatSelectModule,
    FontAwesomeModule
  ]
})
export class HomeModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faSnowflake, faCloudMeatball, faBolt, faCloudShowersHeavy, faCloudRain, faPooStorm, faCloud, faCloudSun);
  }
 }
