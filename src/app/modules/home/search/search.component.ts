import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map, first } from 'rxjs/operators';
import { LoadingService } from '@shared/_loading/loading.service';
import { City } from '@shared/models/city';
import { WeatherService } from '@core/services/weather.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchFormControl = new FormControl();
  options: City[] = [];
  filteredOptions: Observable<City[]>;
  submitted: boolean;

  constructor(
    private loadingService: LoadingService,
    private weatherService: WeatherService
  ) {
    this.submitted = false;
  }

  ngOnInit() {
    this.getCities();
  }

  private _filtered() {
    this.filteredOptions = this.searchFormControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => this._filter(name))
      );
  }

  private _filter(value: string): City[] {

    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  displayFn(city: City): string {
    return city && city.name ? city.name : '';
  }

  getCities() {
    this.loadingService.showLoading();
    this.weatherService.getCities()
      .pipe(first())
      .subscribe(
        data => {
          this.options = data;
          this._filtered();

          this.loadingService.hideLoading();
        },
        error => {
          this.loadingService.hideLoading();
        });
  }

  city() {
    this.submitted = true;
    if (this.searchFormControl.invalid) {
      return;
    }
    this.weatherService.selectedCity(this.searchFormControl.value);
  }
}
