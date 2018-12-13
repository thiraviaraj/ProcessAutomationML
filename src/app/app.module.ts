import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SortablejsModule } from '../../node_modules/angular-sortablejs';

import { AppComponent } from './app.component';
import { routingModule } from './app.routing';
import { LayoutComponent } from './ui/layout/layout.component';
import { HeaderComponent } from './ui/header/header.component';
import { FooterComponent } from './ui/footer/footer.component';
import { Page1Component } from './ui/page1/page1.component';
import { Page2Component } from './ui/page2/page2.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    Page1Component,
    Page2Component
  ],
  imports: [
    BrowserModule,
    routingModule,
    FormsModule,
    SortablejsModule.forRoot({ animation: 150 })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
