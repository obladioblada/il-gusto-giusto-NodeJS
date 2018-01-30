import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {


    isLinear = true;
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;


    constructor() { }

  ngOnInit() {

  }

  onSignUp()
  {
  }

}
