import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public odometer: string = '';

  constructor() {}

  async scanNow() {
    this.odometer = 'Scanning...';
  }
}
