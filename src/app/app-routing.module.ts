import { NgModule } from '@angular/core';
import { RouterModule, Routes, Route } from '@angular/router';
import {EmiComponent} from './components/emi/emi.component';
import {Emi2Component} from './components/emi2/emi2.component';

/**
 * - Router group để side bar có thể import và tự động điều chỉnh các phần tử.
 * - Các module con sẽ lấy từng phần tử con của router groups để routing riêng
 */
export const ROUTER_GROUPS = {
  APP_GROUP: {
    name: null,
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'emi',
        pathMatch: 'full',
        data: {
          display: false
        }
      },
      {
        path: 'emi',
        component: EmiComponent,
        data: {
          name: 'EMI',
          icon: 'Dashboard',
          display: true
        }
      },
      {
        path: 'emi2',
        component: Emi2Component,
        data: {
          name: 'EMI 2',
          icon: 'Dashboard',
          display: true
        }
      },
    ] as Routes
  }
};

const redirectRoute: Route = {
  path: '**',
  redirectTo: 'dashboard',
  pathMatch: 'full'
}

@NgModule({
  imports: [RouterModule.forRoot([ROUTER_GROUPS.APP_GROUP, redirectRoute])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
