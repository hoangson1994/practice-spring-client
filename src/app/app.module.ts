import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N, vi_VN } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import vi from '@angular/common/locales/vi';
import { HeaderComponent } from './layouts/header/header.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { SharedModule } from './shared/shared.module';
import { EmiComponent } from './components/emi/emi.component';
import { Emi2Component } from './components/emi2/emi2.component';

registerLocaleData(vi);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    EmiComponent,
    Emi2Component
  ],
  imports: [
    SharedModule,
    AppRoutingModule
  ],
  providers: [{ provide: NZ_I18N, useValue: vi_VN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
