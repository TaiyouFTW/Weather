import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { City } from '@shared/models/city';
import { LoadingService } from '@shared/_loading/loading.service';
import { WeatherService } from '@core/services/weather.service';
import { first } from 'rxjs/operators';
import { Weather, ConsolidatedWeather } from '@shared/models/weather';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  weather: Weather;
  todayDate: Date;
  weatherDate: Date;
  todayWeather: ConsolidatedWeather;
  weatherIcon: string[];

  constructor(
    private loadingService: LoadingService,
    private weatherService: WeatherService
  ) {
    this.weatherIcon = new Array<string>();
    this.weather = {} as Weather;
    this.todayDate = new Date();
    this.todayWeather = {} as ConsolidatedWeather;
    this.todayWeather.applicable_date = new Date();
    this.weatherIcon = ['fas', 'snowflake'];

  }

  ngOnInit() {
    this.weatherService.currentCity.subscribe(
      city => {
        this.getWeather(city.woeid);
      }
    )
  }

  //#region Weather
  getWeather(woeid: string) {
    if (!this.isANewWoeid(woeid) && !this.isANewWeatherDate()) {
      this.weather = this.weatherService.currentWeatherValue;
      this.getFirstWeather();
      console.log("from cache");
    } else {
      console.log("not from cache");
      this.loadingService.showLoading();
      this.weatherService.getWeather(woeid)
        .pipe(first())
        .subscribe(
          data => {
            this.weather = data;
            this.getFirstWeather();
            this.loadingService.hideLoading();
          },
          error => {
            this.loadingService.hideLoading();
          });
    }
  }


  // verify if has a new woeid
  isANewWoeid(woeid: string): boolean {
    if (this.weatherService.currentWeatherValue === null) {
      return true;
    } else {
      if (woeid !== this.weatherService.currentWeatherValue.woeid.toString())  {
        return true;
      }
    }
    return false;
  }

  isANewWeatherDate(): boolean {
    if (this.weatherService.currentWeatherValue !== null) { 
      this.weatherDate = new Date(this.weatherService.currentWeatherValue.time);

      this.weatherDate.setHours(0,0,0);
      this.todayDate.setHours(0,0,0);

      let dateNow = this.todayDate.getTime() ;
      let dateCache = this.weatherDate.getTime();

      if(dateNow > dateCache) {
        return true;
      }
    }
    return false;
  }

  getFirstWeather() {
    this.todayWeather = this.weather.consolidated_weather[0];
    this.weather.consolidated_weather.shift();
    this.iconWeather(this.todayWeather.weather_state_abbr);
  }

  iconWeather(wStates: string) {
    switch (wStates) {
      case 'sn': // Abbreviation of Snow
        this.weatherIcon = ['fas', 'snowflake'];
        break;
      case 'sl': // Abbreviation of Sleet
        this.weatherIcon = ['fas', 'cloud-meatball'];
        break;
      case 'h': // Abbreviation of Hail
        this.weatherIcon = ['fas', 'cloud-meatball'];
        break;
      case 't': // Abbreviation of Thunderstorm
        this.weatherIcon = ['fas', 'bolt'];
        break;
      case 'hr': // Abbreviation of Heavy Rain
        this.weatherIcon = ['fas', 'cloud-showers-heavy'];
        break;
      case 'lr': // Abbreviation of Light Rain
        this.weatherIcon = ['fas', 'cloud-rain'];
        break;
      case 's': // Abbreviation of Showers
        this.weatherIcon = ['fas', 'poo-storm'];
        break;
      case 'hc': // Abbreviation of Heavy Cloud
        this.weatherIcon = ['fas', 'cloud'];
        break;
      case 'lc': // Abbreviation of Light Cloud
        this.weatherIcon = ['fas', 'cloud'];
        break;
      case 'c': // Abbreviation of Clear
        this.weatherIcon = ['fas', 'cloud-sun'];
        break;
    
      default:
        this.weatherIcon = ['fas', 'cloud-sun'];
        break;
    }
  }
  //#endregion
}
