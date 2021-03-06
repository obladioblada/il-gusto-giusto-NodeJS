import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header/header.component';
import {IntroComponent} from './header/intro/intro.component';
import {DrawAnimationDirective} from './draw-animation.directive';
import {ChiSiamoContainerComponent} from './chi-siamo-container/chi-siamo-container.component';
import {MenuComponent} from './menu/menu.component';
import {DoveSiamoContainerComponent} from './dove-siamo-container/dove-siamo-container.component';
import {HomeComponent} from './home/home.component';
import {FooterVassoioComponent} from './menu/footer-vassoio/footer-vassoio.component';
import {AppRoutingModule} from './app-routing.module';
import {VassoioFormComponent} from './menu/vassoio-form/vassoio-form.component';
import {ProdottoComponent} from './menu/prodotto/prodotto.component';
import {VassoioService} from './services/vassoio.service';
import {FoodService} from './services/food.service';
import {ConfirmationComponent} from './confirmation/confirmation.component';
import {IntroService} from './services/intro.service';
import {SignInComponent} from "./auth/sign-in/sign-in.component";
import {SignUpComponent} from "./auth/sign-up/sign-up.component";
import {HttpClientModule} from "@angular/common/http";
import {BraintreeComponent} from "./menu/vassoio-form/braintree.component";
import {BraintreeService} from "./services/braintree.service";
import {DropdownDirective} from "./shared/dropdown.directive";
// material imports
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule,} from '@angular/forms';


import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatSnackBarModule,
    MatStepperModule,
    MatTabsModule,
    MatToolbarModule,
} from '@angular/material';
import 'hammerjs';
import {AuthService} from "./services/auth.service";
import {AuthGuardService} from "./services/auth-guard.service";
import {BraintreeDirective} from "./braintree.directive";
import {VassoioGuardService} from "./services/vassoio-guard.service";
import {AgmCoreModule} from '@agm/core';
import {AgmSnazzyInfoWindowModule} from '@agm/snazzy-info-window';
import {Ng2ImgToolsModule, Ng2ImgToolsService} from "ng2-img-tools";
import {FileUploadModule} from "ng2-file-upload";

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        IntroComponent,
        DrawAnimationDirective,
        BraintreeDirective,
        ChiSiamoContainerComponent,
        MenuComponent,
        DoveSiamoContainerComponent,
        HomeComponent,
        FooterVassoioComponent,
        VassoioFormComponent,
        ProdottoComponent,
        ConfirmationComponent,
        SignInComponent,
        SignUpComponent,
        BraintreeComponent,
        DropdownDirective,

    ],
    imports: [
        BrowserModule,
        MatButtonModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        BrowserAnimationsModule,
        BrowserModule,
        MatTabsModule,
        MatFormFieldModule,
        MatInputModule,
        MatListModule,
        AppRoutingModule,
        MatStepperModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        MatRadioModule,
        HttpClientModule,
        MatCheckboxModule,
        MatDialogModule,
        Ng2ImgToolsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCjVfcCJ63Fwtco-q1CR32Bnp562xQWLAg'
        }),
        AgmSnazzyInfoWindowModule,
        FileUploadModule
    ],
    exports: [
        MatButtonModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatTabsModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
        BrowserModule,
        MatListModule,
        MatStepperModule,
        MatDatepickerModule,
        MatRadioModule,
        MatCheckboxModule,
        IntroComponent
    ],
    providers: [
        FoodService,
        VassoioService,
        IntroService,
        AuthService,
        AuthGuardService,
        BraintreeService,
        VassoioGuardService,
        Ng2ImgToolsService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor() {

    }
}
