import {User} from "../auth/user.model";
import {EventEmitter, Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";




@Injectable()
export class AuthService {

    user: User;
    usrEvent = new EventEmitter<any>();
    fd= new FormData();


    constructor(private http: HttpClient){
    }

    signUp(user: User, image: any){
        console.log(image);
        if (image != null) { this.fd.append('image',image, image.name); }
        this.fd.append('name',user.name);
        this.fd.append('surname',user.surname);
        this.fd.append('email',user.email);
        this.fd.append('password',user.password);
        const header = new HttpHeaders();
        return this.http.post('http://localhost:3000/user/signup', this.fd,
             {headers: header })
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