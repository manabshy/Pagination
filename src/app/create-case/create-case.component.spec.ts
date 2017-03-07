/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Component,Input } from '@angular/core';
import { Router, ActivatedRoute, Params,RouterModule } from '@angular/router';
import { CreateCaseComponent } from './create-case.component';
import { FormGeneratorComponent} from '../core/dynamic-forms/form-generator/form-generator.component';
import { FieldGeneratorComponent} from '../core/dynamic-forms/field-generator/field-generator.component';
import { NotificationComponent} from '../shared/notification/notification.component';
import { DropdownComponent} from '../core/dynamic-forms/field-templates/dropdown/dropdown.component';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { FormGroup,FormControl,FormBuilder,FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Http,XHRBackend,HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AppConfig } from '../common/config/app.config';
import { HttpHeaders } from '../common/config/http.headers';

describe('CreateCaseComponent', () => {
  let component: CreateCaseComponent;
  let fixture: ComponentFixture<CreateCaseComponent>;

  beforeEach(async(() => {
    class AppConfigStub{
      getKey(){}
    }
    TestBed.configureTestingModule({
      declarations: [ CreateCaseComponent,FormGeneratorComponent,FieldGeneratorComponent,DropdownComponent,NotificationComponent ],
      providers:[        
      {provide: XHRBackend, useClass: MockBackend },
      {provide: AppConfig,useClass:AppConfigStub},
      {provide:ActivatedRoute,useValue:{ 'params': Observable.from([{'id':1}])}},
      {provide: HttpHeaders}],
      imports:[FormsModule,ReactiveFormsModule,HttpModule,RouterModule]      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCaseComponent);
    component = fixture.componentInstance;
    //console.log(component);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
