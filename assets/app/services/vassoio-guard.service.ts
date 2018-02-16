import {ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {VassoioService} from "./vassoio.service";

export interface SaveOnDeactivate{
    canDeactivate:() => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class VassoioGuardService implements CanActivate, CanDeactivate<SaveOnDeactivate>{

    constructor(private vassoioService: VassoioService){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        this.vassoioService.loadFromLocalStorage();
        return true;
    }

    canDeactivate(component: SaveOnDeactivate, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return component.canDeactivate();
    }

}