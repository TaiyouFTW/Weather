import { Component, OnInit } from '@angular/core';
import { LoadingService } from '@shared/_loading/loading.service';
import { WeatherService } from '@core/services/weather.service';
import { first } from 'rxjs/operators';
import { Weather } from '@shared/models/weather';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  weather: Weather;
  todayDate: Date;
  weatherDate: Date;
  weatherIcon: string[];

  constructor(
    private loadingService: LoadingService,
    private weatherService: WeatherService
  ) {
    this.weatherIcon = new Array<string>();
    this.weather = {} as Weather;
    this.todayDate = new Date();
    this.weatherIcon = ['fas', 'snowflake'];
  }

  ngOnInit() {
    this.weatherService.currentCity.subscribe(
      city => {
        if (city != null) {
          this.getWeather(city.woeid);
        } else {
          // toDo: Add id by region.
          this.getWeather('455827');
        }
      }
    )
  }

  //#region Weather
  getWeather(woeid: string) {
    this.loadingService.showLoading();

    if (this.isANewWoeid(woeid) || this.isDifferentBetweenDates()) {
      console.log("not from cache");
      this.weatherService.getWeather(woeid)
        .pipe(first())
        .subscribe(
          data => {
            this.weather = data;
            this.loadingService.hideLoading();
          },
          error => {
            this.loadingService.hideLoading();
          });
    } else {
      this.weather = this.weatherService.currentWeatherValue;
      this.loadingService.hideLoading();
      console.log("from cache");
    }
  }


  // verify if has a new woeid
  isANewWoeid(woeid: string): boolean {
    if (this.weatherService.currentWeatherValue === null) {
      return true;
    } else {
      if (+woeid !== +this.weatherService.currentWeatherValue.woeid) {
        return true;
      }
    }
    return false;
  }

  isDifferentBetweenDates(): boolean {
    if (this.weatherService.currentWeatherValue !== null) {
      this.weatherDate = new Date(this.weatherService.currentWeatherValue.time);

      this.weatherDate.setHours(0, 0, 0);
      this.todayDate.setHours(0, 0, 0);

      if (this.todayDate.getDay !== this.weatherDate.getDay) {
        return true;
      } else {
        if (this.todayDate.getMonth !== this.weatherDate.getMonth) {
          return true;
        } else {
          if (this.todayDate.getFullYear !== this.weatherDate.getFullYear) { 
            return true;
          }
        }
      }
    }
    return false;
  }

  iconWeather(wStates: string) {
    switch (wStates) {
      case 'sn': // Abbreviation of Snow
        return this.weatherIcon = ['fas', 'snowflake'];
        break;
      case 'sl': // Abbreviation of Sleet
        return this.weatherIcon = ['fas', 'cloud-meatball'];
        break;
      case 'h': // Abbreviation of Hail
        return this.weatherIcon = ['fas', 'cloud-meatball'];
        break;
      case 't': // Abbreviation of Thunderstorm
        return this.weatherIcon = ['fas', 'bolt'];
        break;
      case 'hr': // Abbreviation of Heavy Rain
        return this.weatherIcon = ['fas', 'cloud-showers-heavy'];
        break;
      case 'lr': // Abbreviation of Light Rain
        return this.weatherIcon = ['fas', 'cloud-rain'];
        break;
      case 's': // Abbreviation of Showers
        return this.weatherIcon = ['fas', 'poo-storm'];
        break;
      case 'hc': // Abbreviation of Heavy Cloud
        return this.weatherIcon = ['fas', 'cloud'];
        break;
      case 'lc': // Abbreviation of Light Cloud
        return this.weatherIcon = ['fas', 'cloud'];
        break;
      case 'c': // Abbreviation of Clear
        return this.weatherIcon = ['fas', 'cloud-sun'];
        break;

      default:
        return this.weatherIcon = ['fas', 'cloud-sun'];
        break;
    }
  }
  //#endregion
}