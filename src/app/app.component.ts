import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-loading></app-loading>
    <app-header></app-header>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'myTemplate';
}
