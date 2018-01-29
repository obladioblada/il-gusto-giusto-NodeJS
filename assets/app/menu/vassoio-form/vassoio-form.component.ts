import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {VassoioService} from '../../services/vassoio.service';
import {Prodotto} from '../model/prodotto.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-vassoio-form',
  templateUrl: './vassoio-form.component.html',
  styleUrls: ['./vassoio-form.component.css']
})
export class VassoioFormComponent implements OnInit {

  vassoio: Prodotto[] = [];

  gastronomia: Prodotto[] = [];
  panini: Prodotto[] = [];
  bevande: Prodotto[] = [];

  totale: number;
  secondFormGroup: FormGroup;

  d = new Date();

  @ViewChild('hourspicker') hoursPicker: ElementRef;

  constructor( private vassoioService: VassoioService,
               private _formBuilder: FormBuilder,
               private router: Router) { }

  ngOnInit() {
    this.vassoio = this.vassoioService.vassoio;
    this.totale = this.vassoioService.totale;
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    this.hoursPicker.nativeElement.placeholder = this.d.getHours() + ':' + this.d.getMinutes();
    console.log(( this.d.getHours() + 1 ) + ':' + this.d.getMinutes());

    // filter panini
    this.panini = this.vassoioService.vassoio.filter(
      ele => ele.elemento.tipo === 'panino');
    // filter gastronomia
    this.gastronomia = this.vassoioService.vassoio.filter(
      ele => ele.elemento.tipo === 'gastronomia');
    // filter bevande
    this.bevande = this.vassoioService.vassoio.filter(
      ele => ele.elemento.tipo === 'bevanda');

    this.vassoioService.tryChanged.subscribe(() => {
      console.log('totale service:' + this.vassoioService.totale);
      console.log('totale vassoio:' + this.totale);
      this.totale = this.vassoioService.totale;
      // filter panini
      this.panini = this.vassoioService.vassoio.filter(
        ele => ele.elemento.tipo === 'panino');
      // filter gastronomia
      this.gastronomia = this.vassoioService.vassoio.filter(
        ele => ele.elemento.tipo === 'gastronomia');
      // filter bevande
      this.bevande = this.vassoioService.vassoio.filter(
        ele => ele.elemento.tipo === 'bevanda');
    });
  }

  onSendBooking() {
    this.router.navigate(['/conferma']);
  }


  onResetVassoio() {
    this.vassoioService.resetVassoio();
    this.vassoio = this.vassoioService.vassoio;
    this.totale = this.vassoioService.totale;
  }

  onDeleteItem(prodotto) {
    // elimino prodotto dal vassoio
    this.vassoioService.onDeleteElement(prodotto);
  }

  onAddItem(prodotto) {
    this.vassoioService.onAddItem(prodotto);
  }

}
