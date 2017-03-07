/* tslint:disable:no-unused-variable */
import { async,ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormDataService } from '../../core/dynamic-forms/form-service/form-data.service';
import { HomeComponent } from './home.component';

@Component({ selector: 'app-create-case', template: '' })
class CreateCaseStubComponent { };

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent,CreateCaseStubComponent ],
      providers:[{provide: FormDataService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
