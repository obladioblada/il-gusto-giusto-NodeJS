import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {BraintreeService} from "../../services/braintree.service";

let dropin = require('braintree-web-drop-in');

@Component({
    selector: 'app-braintree',
    templateUrl: './braintree.component.html',
    styleUrls: ['./braintree.component.css']
})
export class BraintreeComponent implements OnInit {

    @Input() clientTokenURL: string;
    @Input() createPurchaseURL: string;
    @Output() paymentStatus: EventEmitter<any> = new EventEmitter<any>();
    clientToken: string;
    showDropinUI = true;
    clientTokenNotReceived = false;
    interval: any;
    instance: any;

    // Optional inputs
    @Input() buttonText = 'Buy';


    constructor(private btService: BraintreeService) {
    };

    ngOnInit(): void {
        this.btService
            .getClientToken(this.clientTokenURL)
            .subscribe((clientToken: string) => {
                this.clientToken = clientToken;
                this.clientTokenNotReceived = false;
                this.interval = setInterval(() => {
                    this.createDropin();
                }, 0);
            }, (error) => {
                this.clientTokenNotReceived = true;
                console.log(`Client token not received. Please make sure your braintree server api is configured properly, running and accessible.`);
            });
    }

    createDropin() {
        if (typeof dropin !== 'undefined') {
            dropin.create({
                authorization: this.clientToken,
                container: '#dropin-container',
                locale: 'it_IT',
                paypal: {

                    flow: 'voult',
                    buttonStyle: {
                        color: 'gold',
                        shape: 'pill',
                        size: 'medium'
                    }
                }
            }, (createErr, instance) => {
                this.instance = instance;
            });
            clearInterval(this.interval);
        }
    }


    pay(): void {
        if (this.instance) {
            this.instance.requestPaymentMethod((err, payload) => {
                this.showDropinUI = false;
                console.log(payload.nonce);
                this.btService
                    .createPurchase(this.createPurchaseURL, payload.nonce)
                    .subscribe((status: any) => {
                        this.paymentStatus.emit(status);
                    });
            });
        }
    }

    onPaymentStatus($event) {
        console.log($event);
    }

}