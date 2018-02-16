import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {User} from "../user.model";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {


    isLinear = true;
    signInFormGroup: FormGroup;

    constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

   ngOnInit() {
    this.signInFormGroup = new FormGroup({
        'email': new FormControl (null, [ Validators.required, Validators.email ], [ this.emailValidator.bind(this)] ),
        'password': new FormControl(null, [Validators.required, Validators.minLength(5)]),
      });

    this.route.queryParams.subscribe(
        (queryParams: Params) =>{
            if(queryParams['SocialLogin']) {
                this.authService.fetchSocialDataLogin().subscribe(
                    data => this.setToken(data),
                    err => console.log(err)
                );
            }
        }
    );
   }

   // check if email exist in db
    emailValidator( control: FormControl){
        const email = control.value;
        const promise = new Promise<any>((resolve , reject) =>{
            this.authService.checkIfEmailExist(email)
                .subscribe(
                    data => {
                        if(data.emailFound){resolve(null);}
                        else {resolve({error:'error email not used'});}
                        resolve(null)
                    },
                    error => {
                       console.log('error email ');
                    })
        });

        return promise;

    }


    onSubmit(){
        const email = this.signInFormGroup.value.email;
        const password = this.signInFormGroup.value.password;
        const user = new User(email, password);
        this.authService.signIn(user)
            .subscribe(
                data => this.setToken(data),
                error => console.log(error)
            );
    }

    setToken(data){
        this.authService.user = data.user;
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.user._id);
        this.authService.usrEvent.emit('utenteLoggato');
        console.log('utente loggato');
        this.router.navigate(['/prenota']);
    }


}
