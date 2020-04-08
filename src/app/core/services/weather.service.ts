import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { City } from '@shared/models/city';
import { map } from 'rxjs/operators';
import { Weather } from '@shared/models/weather';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private _currentWeatherSubject: BehaviorSubject<Weather>;
  public currentWeather: Observable<Weather>;

  private _currentCitySubject: BehaviorSubject<City>;
  public currentCity: Observable<City>;

  private httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    this._currentWeatherSubject = new BehaviorSubject<Weather>(JSON.parse(localStorage.getItem('CurrentWeather')));
    this.currentWeather = this._currentWeatherSubject.asObservable();

    this._currentCitySubject = new BehaviorSubject<City>(JSON.parse(localStorage.getItem('CurrentCity')));
    this.currentCity = this._currentCitySubject.asObservable();
  }

  public get currentWeatherValue(): Weather {
    return this._currentWeatherSubject.value;
  }

  public get currentCityValue(): City {
    return this._currentCitySubject.value;
  }

  headers() {
    return this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
  }

  getWeather(woeid: string) {
    return this.http.get<any>(environment.urlApi + woeid, { headers: this.headers() })
      .pipe(map(response => {
        if (response) {
          localStorage.setItem('CurrentWeather', JSON.stringify(response));
          this._currentWeatherSubject.next(response);
          return response;
        }
      }));
  }

  getCities() {

    return this.http.get<City[]>(environment.cities)
      .pipe(map(response => {
        if (response) {
          return response;
        }
      }));
  }

  selectedCity(city: City) {
    localStorage.setItem('CurrentCity', JSON.stringify(city));
    this._currentCitySubject.next(city);
  }
}
