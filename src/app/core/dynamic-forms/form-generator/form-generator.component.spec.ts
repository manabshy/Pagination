/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormGeneratorComponent } from './form-generator.component';
import { FieldGeneratorComponent } from '../field-generator/field-generator.component'
import { DropdownComponent} from '../field-templates/dropdown/dropdown.component';
import { NotificationComponent} from '../../../shared/notification/notification.component'
import { FieldControlService } from '../form-service/field-control.service';
import { CreateCaseService } from '../../../create-case/create-case.service';

import { MockBackend, MockConnection } from '@angular/http/testing';
import { Component } from '@angular/core';
import { FormGroup,FormControl,FormBuilder,FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Http,XHRBackend,HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router'
import { AppConfig } from '../../../common/config/app.config';
import { HttpHeaders } from '../../../common/config/http.headers';

describe('FormGeneratorComponent', () => {
  let component: FormGeneratorComponent;
  let fixture: ComponentFixture<FormGeneratorComponent>;
  let createCaseService: CreateCaseService; // the TestBed injected service
  let componentCaseService: CreateCaseService; // the actually injected service
  let componentFieldControlService: FieldControlService

  beforeEach(async(() => {
    class AppConfigStub{
      getKey(){}
    }
    TestBed.configureTestingModule({
      declarations: [FormGeneratorComponent,FieldGeneratorComponent,DropdownComponent,NotificationComponent],
      providers:[{provide: XHRBackend, useClass: MockBackend },{provide:FieldControlService},
      {provide:CreateCaseService}, {provide: AppConfig,useClass:AppConfigStub}, {provide: HttpHeaders}],
      imports:[FormsModule,ReactiveFormsModule,HttpModule,RouterModule]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(FormGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // createCaseService = fixture.debugElement.injector.get(CreateCaseService);
    // componentCaseService = createCaseService;
    // createCaseService = TestBed.get(CreateCaseService);
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should inject the component\'s CreateCaseService instance',
    inject([CreateCaseService], (service: CreateCaseService) => {
    expect(service).toBe(componentCaseService);
  }));
  it('should inject the component\'s FieldControlService instance',
    inject([FieldControlService], (service: FieldControlService) => {
    expect(service).toBe(componentFieldControlService);
  }));

});
