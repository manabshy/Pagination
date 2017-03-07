import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { FormGeneratorComponent } from './form-generator/form-generator.component';
import { FieldGeneratorComponent } from './field-generator/field-generator.component';
import { FormDataService } from './form-service/form-data.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownComponent } from './field-templates/dropdown/dropdown.component';
import { DropdownService } from './field-templates/dropdown/dropdown.service';
import { SharedModule } from '../../shared/shared.module';

import { AppConfig } from '../../common/config/app.config';
import { RouterModule } from '@angular/router';


@NgModule({
    declarations: [FormGeneratorComponent, DropdownComponent, FieldGeneratorComponent],
    imports: [CommonModule, BrowserModule, FormsModule, ReactiveFormsModule,SharedModule, RouterModule],
    providers: [FormDataService, DropdownService, AppConfig],
    exports: [FormGeneratorComponent]
})
export class DynamicFormModule { }
