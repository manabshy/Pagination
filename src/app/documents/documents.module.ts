import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { SharedModule } from '../shared/shared.module';
import { ListModule } from '../shared/list/list.module'
import { NavigationModule } from '../shared/navigation/navigation.module';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { DocumentService } from './shared/document.service';
import { AppConfig } from '../common/config/app.config';
import { HttpHeaders } from '../common/config/http.headers';

@NgModule({
  declarations: [
    FileUploadComponent
  ],
  exports: [
    FileUploadComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    SharedModule,
    ListModule,
    NavigationModule,
    ReactiveFormsModule
  ],
  providers: [
    DocumentService,
    HttpHeaders
  ]
})
export class DocumentsModule { }
