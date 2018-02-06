import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header/header.component';
import { IntroComponent } from './header/intro/intro.component';
import { DrawAnimationDirective } from './draw-animation.directive';
import { ChiSiamoContainerComponent } from './chi-siamo-container/chi-siamo-container.component';
import { MenuComponent } from './menu/menu.component';
import { DoveSiamoContainerComponent } from './dove-siamo-container/dove-siamo-container.component';
import { HomeComponent } from './home/home.component';
import { FooterVassoioComponent } from './menu/footer-vassoio/footer-vassoio.component';
import { AppRoutingModule} from './app-routing.module';
import { VassoioFormComponent } from './menu/vassoio-form/vassoio-form.component';
import { ProdottoComponent } from './menu/prodotto/prodotto.component';
import { VassoioService} from './services/vassoio.service';
import { FoodService} from './services/food.service';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { IntroService} from './services/intro.service';
import { AmazingTimePickerModule} from 'amazing-time-picker';
import { SignInComponent} from "./auth/sign-in/sign-in.component";
import { SignUpComponent} from "./auth/sign-up/sign-up.component";
import {HttpClientModule} from "@angular/common/http";


// material imports
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule,  } from '@angular/forms';


import {
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatListModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
} from '@angular/material';
import 'hammerjs';
import {AuthService} from "./services/auth.service";
import {AuthGuardService} from "./services/auth-guard.service";



@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        IntroComponent,
        DrawAnimationDirective,
        ChiSiamoContainerComponent,
        MenuComponent,
        DoveSiamoContainerComponent,
        HomeComponent,
        FooterVassoioComponent,
        VassoioFormComponent,
        ProdottoComponent,
        ConfirmationComponent,
        SignInComponent,
        SignUpComponent
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
        AmazingTimePickerModule,
        HttpClientModule
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
        IntroComponent
    ],
    providers: [FoodService, VassoioService, IntroService, AuthService, AuthGuardService],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor() {

    }
}
