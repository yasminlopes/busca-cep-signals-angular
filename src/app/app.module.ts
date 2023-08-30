import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BuscaCepComponent } from './busca-cep/container/busca-cep/busca-cep.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CepMaskDirective } from './busca-cep/directives/cep-mask.directive';

@NgModule({
  declarations: [
    AppComponent,
    BuscaCepComponent,
    CepMaskDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
