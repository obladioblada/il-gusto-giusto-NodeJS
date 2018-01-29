import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {DoveSiamoContainerComponent} from './dove-siamo-container/dove-siamo-container.component';
import {ChiSiamoContainerComponent} from './chi-siamo-container/chi-siamo-container.component';
import {HomeComponent} from './home/home.component';
import {MenuComponent} from './menu/menu.component';
import {VassoioFormComponent} from './menu/vassoio-form/vassoio-form.component';
import {ConfirmationComponent} from './confirmation/confirmation.component';


const appRoutes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'prenota', component: MenuComponent},
  {path: 'vassoio', component: VassoioFormComponent},
  {path: 'chi', component: ChiSiamoContainerComponent},
  {path: 'dove', component: DoveSiamoContainerComponent},
  {path: 'conferma', component: ConfirmationComponent}
];



@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  exports: [RouterModule]
})
export  class AppRoutingModule {

}
