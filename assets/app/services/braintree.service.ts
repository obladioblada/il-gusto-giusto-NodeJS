import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class BraintreeService {

    constructor(private http: HttpClient) {
    }

    getClientToken(clientTokenURL: string): Observable<string> {
        return this.http
            .get(clientTokenURL, {responseType: 'json'})
            .map((response: any) => {
                return response.token;
            })
            .catch((error) => {
                return Observable.throw(error);
            });
    }

    createPurchase(createPurchaseURL: string, nonce: string): Observable<any> {
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http
            .post(createPurchaseURL, {nonce: nonce}, {'headers': headers})
            .map((response: any) => {
                return response;
            });
    }
}