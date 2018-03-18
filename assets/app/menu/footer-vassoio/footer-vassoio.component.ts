import { Component, OnInit } from '@angular/core';
import {VassoioService} from '../../services/vassoio.service';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-footer-vassoio',
  templateUrl: './footer-vassoio.component.html',
  styleUrls: ['./footer-vassoio.component.css']
})
export class FooterVassoioComponent implements OnInit {

  count_items = 0;
  totale = 0;

  constructor(private vassoioService: VassoioService, private authService: AuthService) {
    this.count_items = this.vassoioService.count_carrello_element;
    this.totale = this.vassoioService.totale;
      this.vassoioService.tryChanged.subscribe(
          () => {
              this.count_items = this.vassoioService.count_carrello_element;
              this.totale =  this.vassoioService.totale;
          }
      );
  }

  ngOnInit() {}

  isLoggedIn(){
        return this.authService.isLoggedIn()
  }

}
