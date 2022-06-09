import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProvidersComponent} from "./components/providers/providers.component";
import {ChecksComponent} from "./components/checks/checks.component";

export const appRouteList: Routes = [
  {
    path: '',
    redirectTo: 'fournisseurs',
    pathMatch: 'full'
  },
  {
    path: 'fournisseurs',
    component: ProvidersComponent
  },
  {
    path: 'chèques',
    component: ChecksComponent
  },
  {
    path: '**',
    redirectTo: 'landing'
  }
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(appRouteList)
  ]
})
export class AppRoutingModule {
}
