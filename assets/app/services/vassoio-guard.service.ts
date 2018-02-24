import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {VassoioService} from "./vassoio.service";


@Injectable()
export class VassoioGuardService implements CanActivate{

    constructor(private vassoioService: VassoioService){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        console.log(this.vassoioService.count_carrello_element);
        if (+localStorage.getItem('count_carrello_element')>0 && this.vassoioService.count_carrello_element==0) {
            this.vassoioService.loadFromLocalStorage();
        }
        return true;
    };

}