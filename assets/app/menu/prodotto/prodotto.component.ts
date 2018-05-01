import {Component, Input, OnInit} from '@angular/core';
import {Prodotto} from '../model/prodotto.model';
import {VassoioService} from '../../services/vassoio.service';

@Component({
    selector: 'app-prodotto',
    templateUrl: './prodotto.component.html',
    styleUrls: ['./prodotto.component.css']
})
export class ProdottoComponent implements OnInit {

    @Input() prodotto: Prodotto;

    constructor(private vassioService: VassoioService) {
    }

    ngOnInit() {
    }


    onAddElement() {
        this.vassioService.onElementAdded(this.prodotto);
    }
}
