import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-loading></app-loading>
    <app-header></app-header>
    <div class="wrapper">
      <router-outlet></router-outlet>
      <div class="push"></div>
    </div>
    <app-footer></app-footer>
  `,
  styles: []
})
export class AppComponent {
  title = 'weather';
}
