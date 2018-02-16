import {Directive, Inject, OnDestroy, OnInit, Renderer2} from "@angular/core";
import {DOCUMENT} from "@angular/common";

@Directive({
    selector: '[braintreeDirective]'
})
export class BraintreeDirective implements OnInit,OnDestroy{

    dropInScript: any;

     constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: any){

     };

    ngOnInit(): void {
        console.log("directive loaded");
        this.dropInScript = this.renderer.createElement('script');
        this.dropInScript.type = 'text/javascript';
        this.dropInScript.src = 'https://js.braintreegateway.com/web/dropin/1.8.0/js/dropin.min.js';
        this.renderer.appendChild(this.document.body, this.dropInScript);
    }

    ngOnDestroy(): void {
        this.renderer.removeChild(this.document.body, this.dropInScript);
    }

}