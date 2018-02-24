import {Component, HostListener} from '@angular/core';
import {FoodService} from '../services/food.service';
import {VassoioService} from '../services/vassoio.service';
import {Event, NavigationStart, Router} from '@angular/router';
import {Prodotto} from './model/prodotto.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: []
})
export class MenuComponent {
  onVassoioURL: boolean;
  trayEmpty: boolean;
  panini: Prodotto[] = [];
  gastronomia: Prodotto[] = [];
  bevande: Prodotto[] = [];

  constructor(private foodService: FoodService, private vassoioService: VassoioService, private router: Router) { }

  ngOnInit() {
    this.trayEmpty =  this.vassoioService.count_carrello_element === 0;
    this.panini = this.foodService.getPanini();
    this.gastronomia = this.foodService.getProdottiGastronomia();
    this.bevande = this.foodService.getBevande();
    this.getProdutcs();
    // getting bevande from backendd
    this.router.events.subscribe((e: Event) => {
      if (e instanceof NavigationStart ) {
       if (e.url === '/prenota/vassoio') {
          this.onVassoioURL = true;
          this.vassoioService.saveOnLocalStorage();
       }
      }
    });

    this.vassoioService.tryChanged.subscribe(
      (event) => {
        this.trayEmpty = false;
      }
    );
    this.vassoioService.loadFromLocalStorage();

  }


  getProdutcs(){
    this.foodService.getRESTProducts().subscribe(
        data => console.log(data),
        err => console.log(err),
        () =>{}
    );
  }

    // save when leavaing app
    @HostListener('window:beforeunload', ['$event'])
    saveOnLocal() {
        this.vassoioService.saveOnLocalStorage();
    }

}
