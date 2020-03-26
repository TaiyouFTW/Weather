import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-loading></app-loading>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'myTemplate';
}
