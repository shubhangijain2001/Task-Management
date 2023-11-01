import { Component } from '@angular/core';
import * as moment from 'moment';
     
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  ngOnInit(): void {
    const date = moment();
    let todayDate = date.format('M/D/YYYY');
    console.log(todayDate);
    
  }
}
