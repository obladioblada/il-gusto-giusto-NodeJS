import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {User} from "../user.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;

  constructor(private authSercive: AuthService, private router: Router) { }

  ngOnInit() {
   this.signUpForm = new FormGroup({
       'name': new FormControl(null, Validators.required),
       'surname': new FormControl(null, Validators.required),
       'email': new FormControl(null, [Validators.required, Validators.email]),
       'password': new FormControl(null, Validators.required)
   });
  }

  onSubmit(){
      const name = this.signUpForm.value.name;
      const surname = this.signUpForm.value.surname;
      const email = this.signUpForm.value.email;
      const password = this.signUpForm.value.password;
      const user = new User(email,password,name,surname, false);
      this.authSercive.signUp(user)
          .subscribe(
              data => {console.log(data)
                  this.router.navigate(['/signIn']);
              },
              error => console.log(error)
              );
      this.signUpForm.reset();


  }

}
