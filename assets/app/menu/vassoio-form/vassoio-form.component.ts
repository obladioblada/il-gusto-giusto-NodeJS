import {Component, HostListener, OnInit} from '@angular/core';
import {VassoioService} from '../../services/vassoio.service';
import {Prodotto} from '../model/prodotto.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {DateAdapter} from '@angular/material/core';
import {MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material";
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from "@angular/material-moment-adapter";
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { MatStepper } from '@angular/material';

import * as _moment from 'moment';
import {Moment} from "moment";


const moment =  _moment;



@Component({
  selector: 'app-vassoio-form',
  templateUrl: './vassoio-form.component.html',
  styleUrls: ['./vassoio-form.component.css'], providers: [
        // The locale would typically be provided on the root module of your application. We do it at
        // the component level here, due to limitations of our example generation script.
        {provide: MAT_DATE_LOCALE, useValue: 'it'},

        // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
        // `MatMomentDateModule` in your applications root module. We provide it at the component level
        // here, due to limitations of our example generation script.
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    ],
})
export class VassoioFormComponent implements OnInit {
  vassoio: Prodotto[] = [];

  gastronomia: Prodotto[] = [];
  panini: Prodotto[] = [];
  bevande: Prodotto[] = [];

  totale: number;
  formGroup: FormGroup;
  hoursInterface=[
      {
        dayMoment:'Giorno',
          hours:[
              {value:'10:00', viewValue:'10:00'},
              {value:'10:15', viewValue:'10:15'},
              {value:'10:30', viewValue:'10:30'},
              {value:'10:45', viewValue:'10:45'},
              {value:'11:00', viewValue:'11:00'},
              {value:'11:15', viewValue:'11:15'},
              {value:'11:30', viewValue:'11:30'},
              {value:'11:45', viewValue:'11:45'},
              {value:'12:00', viewValue:'12:00'},
              {value:'12:15', viewValue:'12:15'},
              {value:'12:30', viewValue:'12:30'},
              {value:'12:45', viewValue:'12:45'},
              {value:'13:00', viewValue:'13:00'},
              {value:'13:15', viewValue:'13:15'},
              {value:'13:30', viewValue:'13:30'},
              {value:'13:45', viewValue:'13:45'},
              {value:'14:00', viewValue:'14:00'},
              {value:'14:15', viewValue:'14:15'},
              {value:'14:30', viewValue:'14:30'},
              {value:'14:45', viewValue:'14:45'},
              {value:'15:00', viewValue:'15:00'},
              {value:'15:15', viewValue:'15:15'},
              {value:'15:30', viewValue:'15:30'},
              {value:'15:45', viewValue:'15:45'}
          ]
      },
      {
          dayMoment:'Sera',
          hours:[
              {value:'18:00', viewValue:'18:00'},
              {value:'18:15', viewValue:'18:15'},
              {value:'18:30', viewValue:'18:30'},
              {value:'18:45', viewValue:'18:45'},
              {value:'19:00', viewValue:'19:00'},
              {value:'19:15', viewValue:'19:15'},
              {value:'19:30', viewValue:'19:30'},
              {value:'19:45', viewValue:'19:45'},
              {value:'20:00', viewValue:'20:00'},
              {value:'20:15', viewValue:'20:15'},
              {value:'20:30', viewValue:'20:30'},
              {value:'20:45', viewValue:'20:45'},
              {value:'21:00', viewValue:'21:00'},
              {value:'21:15', viewValue:'21:15'},
              {value:'21:30', viewValue:'21:30'},
              {value:'21:45', viewValue:'21:45'},
              {value:'22:00', viewValue:'22:00'},
              {value:'22:15', viewValue:'22:15'},
              {value:'22:30', viewValue:'22:30'},
              {value:'22:45', viewValue:'22:45'},
              {value:'23:00', viewValue:'23:00'}
          ]
      },
  ];
  filteredhours=[
        {
            dayMoment:'Giorno',
            hours:[
                {value:'10:00', viewValue:'10:00'},
                {value:'10:15', viewValue:'10:15'},
                {value:'10:30', viewValue:'10:30'},
                {value:'10:45', viewValue:'10:45'},
                {value:'11:00', viewValue:'11:00'},
                {value:'11:15', viewValue:'11:15'},
                {value:'11:30', viewValue:'11:30'},
                {value:'11:45', viewValue:'11:45'},
                {value:'12:00', viewValue:'12:00'},
                {value:'12:15', viewValue:'12:15'},
                {value:'12:30', viewValue:'12:30'},
                {value:'12:45', viewValue:'12:45'},
                {value:'13:00', viewValue:'13:00'},
                {value:'13:15', viewValue:'13:15'},
                {value:'13:30', viewValue:'13:30'},
                {value:'13:45', viewValue:'13:45'},
                {value:'14:00', viewValue:'14:00'},
                {value:'14:15', viewValue:'14:15'},
                {value:'14:30', viewValue:'14:30'},
                {value:'14:45', viewValue:'14:45'},
                {value:'15:00', viewValue:'15:00'},
                {value:'15:15', viewValue:'15:15'},
                {value:'15:30', viewValue:'15:30'},
                {value:'15:45', viewValue:'15:45'}
            ]
        },
        {
            dayMoment:'Sera',
            hours:[
                {value:'18:00', viewValue:'18:00'},
                {value:'18:15', viewValue:'18:15'},
                {value:'18:30', viewValue:'18:30'},
                {value:'18:45', viewValue:'18:45'},
                {value:'19:00', viewValue:'19:00'},
                {value:'19:15', viewValue:'19:15'},
                {value:'19:30', viewValue:'19:30'},
                {value:'19:45', viewValue:'19:45'},
                {value:'20:00', viewValue:'20:00'},
                {value:'20:15', viewValue:'20:15'},
                {value:'20:30', viewValue:'20:30'},
                {value:'20:45', viewValue:'20:45'},
                {value:'21:00', viewValue:'21:00'},
                {value:'21:15', viewValue:'21:15'},
                {value:'21:30', viewValue:'21:30'},
                {value:'21:45', viewValue:'21:45'},
                {value:'22:00', viewValue:'22:00'},
                {value:'22:15', viewValue:'22:15'},
                {value:'22:30', viewValue:'22:30'},
                {value:'22:45', viewValue:'22:45'},
                {value:'23:00', viewValue:'23:00'}
            ]
        },
    ];
  selectedHour: string;


  today: Date;
  myMondayFilter = (d: Moment): boolean => {
        const day = d.day();
        // Prevent Saturday and Sunday from being selected.
        return day !== 1;
  };


  APERTURA_MATTINA = 10;
  CHIUSURA_MATTINA = 15;
  APERTURA_SERA = 18;
  CHIUSURA_SERA =23;

  constructor( private vassoioService: VassoioService,
               private router: Router,
               private adapter: DateAdapter<any>) { }

  ngOnInit() {
      this.today = new Date();
      this.filteredhours = this.hoursInterface;
      this.vassoio = this.vassoioService.vassoio;
      this.totale = this.vassoioService.totale;
      this.formGroup = new FormGroup({
            'tel' :     new  FormControl(null, [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$')]),
            'date'      :new  FormControl(null, [Validators.required]),
            'hours'     :new  FormControl(null, [Validators.required]),
      },
    );


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

  // save when leavaing app
   @HostListener('window:beforeunload', ['$event'])
    saveOnLocal(){
        this.vassoioService.saveOnLocalStorage();
   }


  onSendBooking() {
    this.router.navigate(['/conferma']);
  }


  onResetVassoio() {
    this.vassoioService.resetVassoio();
    this.vassoio = this.vassoioService.vassoio;
    this.totale = this.vassoioService.totale;
    //clear local storage
      localStorage.removeItem('vassoio');
      localStorage.removeItem('elements');
      localStorage.removeItem('count_carrello_element');
      localStorage.removeItem('totale');
      this.vassoioService.tryChanged.emit("reset");
  }

  onDeleteItem(prodotto) {
    // elimino prodotto dal vassoio
    this.vassoioService.onDeleteElement(prodotto);
    this.vassoioService.saveOnLocalStorage();
  }

  onAddItem(prodotto) {
    this.vassoioService.onAddItem(prodotto);
    this.vassoioService.saveOnLocalStorage();

  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
      //call filter hours to fitler the hours if it's today
      let dateSelectedSplitted:String[];
      if( event.value!=null) {
          dateSelectedSplitted  = event.value.toString().split(' ');
      }
      const toDaySplitted:String[] =this.today.toDateString().split(' ');
      if( dateSelectedSplitted[0]===toDaySplitted[0] &&
          dateSelectedSplitted[1]===toDaySplitted[1] &&
          dateSelectedSplitted[2]===toDaySplitted[2] &&
          dateSelectedSplitted[3]===toDaySplitted[3]){
         this.filterHours();
      } else{
          // reset orario completo
          this.filteredhours = this.hoursInterface;
      }
  }

  filterHours(){
       //let currentHour = this.today.getHours();
        let currentHour = 20;
        if(currentHour < this.APERTURA_MATTINA || currentHour > this.CHIUSURA_SERA) {
            this.filteredhours = this.hoursInterface;

            return;
        }
        else if (currentHour > this.APERTURA_SERA){
            // filtrare sera
            this.filteredhours = this.copy(this.hoursInterface.slice(1));
            this.filteredhours[0].hours= this.filteredhours[0].hours.filter(this.islater);
            return;
        } else if(currentHour >=this.APERTURA_MATTINA){
            //filtrare gli orari di mattina
            this.filteredhours =  this.copy(this.hoursInterface.slice(0));
            this.filteredhours[0].hours= this.filteredhours[0].hours.filter(this.islater);
            return;
        }
  }


   islater(value){
    /* const currentHour = new Date().getHours();
     const currentMinutes = new Date().getMinutes();*/
       const currentHour = 20;
       const currentMinutes = 45;

     const v = value.value.split(':');
     if( (v[0]>currentHour) || ( v[0]===currentHour && v[1]>=currentMinutes) ) {
         return value;
     }
  }

   copy(o){
      let output, v, key;
      output = Array.isArray(o) ? [] : {};
      for (key in o) {
          v = o[key];
          output[key] = (typeof v === "object" && v !== null) ? this.copy(v) : v;
      }
      return output;
  }
    // stepper
    goBack(stepper: MatStepper){
        stepper.previous();
    }

    goForward(stepper: MatStepper){
        stepper.next();
    }



}
