import { Component, OnInit } from '@angular/core';
import {VassoioService} from '../../services/vassoio.service';

@Component({
  selector: 'app-footer-vassoio',
  templateUrl: './footer-vassoio.component.html',
  styleUrls: ['./footer-vassoio.component.css']
})
export class FooterVassoioComponent implements OnInit {

  count_items = 0;
  totale = 0;

  constructor(private vassoioService: VassoioService) {
    this.count_items = this.vassoioService.count_carrello_element;
    this.totale = this.vassoioService.totale;
  }

  ngOnInit() {
    this.vassoioService.tryChanged.subscribe(
      () => {
        this.count_items = this.vassoioService.count_carrello_element;
        this.totale =  this.vassoioService.totale;
      }
    );
  }

}
