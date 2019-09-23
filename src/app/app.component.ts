import { Component , ViewChild} from '@angular/core';

@Component({
  selector: "app",
  template: `<store-header></store-header> 
  <router-outlet></router-outlet>
  <store-footer></store-footer>`
  // templateUrl: './app.component.html',
  // styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

}
