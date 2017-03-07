import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DynamicFormModule } from './core/dynamic-forms/dynamic-forms.module';
import { AppConfig } from './common/config/app.config';
import { HomeComponent } from './core/home/home.component';
import { RoutingComponent } from './core/routing/routing.component';
import { CreateCaseComponent } from './create-case/create-case.component';
import { SharedModule } from './shared/shared.module';
import { DocumentsModule } from './documents/documents.module';
import { ListModule } from './shared/list/list.module';
import { SearchModule } from './search/search.module';
import { HttpClientService } from './shared/http-client.service';
import { NavigationModule } from './shared/navigation/navigation.module';


const IS_DEV = true; 

export function loadConfig(config: AppConfig) {
  return () => config.load();
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateCaseComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DynamicFormModule,
    RoutingComponent,
    SharedModule,  
    DocumentsModule,
    //SearchModule,  Don't Load this module,This will be a lazy loaded module
    ListModule,
    NavigationModule
  ],
  providers: [
    AppConfig,
    HttpClientService,
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfig,
      deps: [AppConfig],
      multi: true
    },
    { provide: 'IS_DEV', useValue: IS_DEV }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
