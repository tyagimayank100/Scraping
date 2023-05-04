import { Component } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  symbol: string;
  data: any;

  constructor() {
    this.symbol = '';
    this.data = null;
  }

  getStockData() {
    axios.get(`http://localhost:3000/stocks/${this.symbol}`)
      .then(res => {
        this.data = res.data;
      })
      .catch(err => {
        console.error(err);
      });
  }
}
