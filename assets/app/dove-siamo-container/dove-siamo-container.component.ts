import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dove-siamo-container',
  templateUrl: './dove-siamo-container.component.html',
  styleUrls: ['./dove-siamo-container.component.css']
})
export class DoveSiamoContainerComponent implements OnInit {

  images: string[];
    lat: number = 38.0778775;
    lng: number = 12.675190;


  constructor() { }

  ngOnInit() {
    this.images = ['http://www.casevacanzanicolasantoro.it/images/matrice-custonaci.jpg',
      'http://www.casevacanzanicolasantoro.it/images/matrice-custonaci.jpg',
      'http://www.casevacanzanicolasantoro.it/images/matrice-custonaci.jpg'
    ];
  }

}
