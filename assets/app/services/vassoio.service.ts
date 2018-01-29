import {Prodotto} from '../menu/model/prodotto.model';
import {EventEmitter} from '@angular/core';

export class VassoioService  {

  // array generale con tutti i prodotto inseriti una sola volta
  elements: any [] = [];
  totale = 0;
  // array contente il oggetti {prodotti e quantita} tipo e la quantità
  vassoio: any[] = [];
  tryChanged: EventEmitter <string> = new EventEmitter<string>();
  count_carrello_element = 0;

   constructor() {
   }
    onElementAdded(elem: Prodotto) {
     if (this.elements.indexOf(elem) > -1) {
       // elemente gia inserito, aggiorno la sua quanttà
       for (const e of this.vassoio){
         if ( e.elemento === elem) {
           e.quantita++;
         }
       }
     }else {
       // elemente non ancora inserito,  imposto la sua quantità ad 1
       this.elements.push(elem);
       this.vassoio.push({ elemento: elem, quantita: 1});
       }
       this.count_carrello_element++;
       this.totale = this.totale + elem.prezzo;
       this.tryChanged.emit();
   }

   resetVassoio() {
     // resettare tutto il vassoio
     this.count_carrello_element = 0;
     this.vassoio.length = 0;
     this.elements.length = 0;
     this.totale = 0;
   }

   onDeleteElement(el) {
     console.log(el.elemento);
     // togliere l'elemento dalla lista/liste e cambiare il prezzo
     for (const p of this.vassoio) {
        if (p === el) {
          if ( p.quantita > 1) {
            p.quantita--;
          } else {
            // elimino l'elemento sia da questo array che dall'altro
            this.vassoio.splice(this.vassoio.indexOf(p), 1);
            this.elements.splice(this.elements.indexOf(el.elemento), 1);
          }
          this.totale = this.totale - p.elemento.prezzo;
          this.count_carrello_element --;
        }
     }
     this.tryChanged.emit('removedElement');
   }

  onAddItem(el) {
    // aggiungere l'elemento dalla lista/liste e cambiare il prezzo
    for (const p of this.vassoio) {
      if (p === el) {
        p.quantita++;
        this.totale = this.totale + p.elemento.prezzo;
      }
    }
    this.count_carrello_element ++;
    this.tryChanged.emit('addElement');
  }

}

