import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ToastrModule } from 'ngx-toastr';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { FormBuilderComponent } from './components/form-builder/form-builder.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { metaReducers, reducers } from './store';
import { SignUpEffects } from './store/effects/sign-up.effects';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    FormBuilderComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({ positionClass: 'toast-top-center' }),
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([SignUpEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
