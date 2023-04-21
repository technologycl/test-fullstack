import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ComponenteComponent} from './components/componente/componente.component';

const routes: Routes = [
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: ComponenteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
