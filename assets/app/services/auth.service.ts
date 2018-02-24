import {User} from "../auth/user.model";
import {EventEmitter, Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";



@Injectable()
export class AuthService {

    user: any;
    usrEvent = new EventEmitter<any>();

    constructor(private http: HttpClient){}

    signUp(user: User){
        const body = JSON.stringify(user);
        const header = new HttpHeaders({'Content-type': 'application/json'});
        return this.http.post('http://localhost:3000/user/signup',body,{headers: header })
           .map((response: Response) => response)
           .catch((error: Response) => Observable.throw(error));
    }

    signIn(user: User){
        const body = JSON.stringify(user);
        const header = new HttpHeaders({'Content-type': 'application/json'});
        return this.http.post('http://localhost:3000/user/signin',body,{headers: header })
            .map((response: Response) => response)
            .catch((error: Response) => Observable.throw(error));
    }


    checkIfEmailExist(email){
        const header = new HttpHeaders({'Content-type': 'application/json'});
        const body= JSON.stringify({ email: email });
        return this.http.post('http://localhost:3000/user/checkemail',body,{headers: header })
            .map((response: Response) => response)
            .catch((error: Response) => Observable.throw(error));
    }

    fetchSocialDataLogin(){
        return this.http.post('http://localhost:3000/user/data','')
            .map((response: Response) => response)
            .catch((error: Response) => Observable.throw(error));
    }


    logout(){
        localStorage.clear();
    }

    isLoggedIn(){
        return localStorage.getItem('token') !== null;
    }

}