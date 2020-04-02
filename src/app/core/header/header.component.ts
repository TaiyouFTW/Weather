import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  daynight: string;
  dateNow: Date;
  hour: any;

  constructor() {
    this.daynight = 'sun';
    this.dateNow = new Date();
    this.hour = this.dateNow.getHours();
    if (this.hour < 6 || this.hour > 18) {
      this.daynight = 'moon';
    }
  }

  ngOnInit() {
  }

}
