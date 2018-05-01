import {Prodotto} from '../menu/model/prodotto.model';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class FoodService {

    p: Prodotto = new Prodotto(
        'hamburger Pollo',
        'hamburger di Pollo',
        3,
        'panino',
        'https://media-cdn.tripadvisor.com/media/photo-s/07/40/22/4a/hamburger-di-pollo.jpg');
    panini: Prodotto[] = [
        this.p, this.p, this.p, this.p, this.p, this.p, this.p, this.p, this.p, this.p, this.p, this.p, this.p, this.p, this.p, this.p
    ];
    bevande: Prodotto[] = [
        new Prodotto(
            'tennets',
            '33cl',
            3,
            'bevanda',
            'https://www.happybardavoli.it/images/bar/birre/tennets.png'),
        new Prodotto(
            'coca cola di ',
            'hamburger di Suino',
            3,
            'bevanda',
            'https://www.happybardavoli.it/images/bar/birre/tennets.png'),
    ];
    gastronomia: Prodotto[] = [
        new Prodotto(
            'Patatine',
            'porzione',
            1.5,
            'gastronomia',
            'http://static.salepepe.it/files/2014/03/come-fare-patate-fritte_05.jpg'),
        new Prodotto(
            'panelle ',
            'porzione',
            1.5,
            'gastronomia',
            'https://www.cookingwithnonna.com/images/stories/rapidrecipe/th/860-cwn-panelle-siciliane.jpg'),
    ];

    constructor(private http: HttpClient) {
    }

    getPanini() {
        return this.panini;
    }

    getBevande() {
        return this.bevande;
    }

    getProdottiGastronomia() {
        return this.gastronomia;
    }

    getRESTProducts() {
        return this.http.get('/products');
    }

}
