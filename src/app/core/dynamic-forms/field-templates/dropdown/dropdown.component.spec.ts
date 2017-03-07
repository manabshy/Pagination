/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement,Component } from '@angular/core';
import { FormGroup,FormsModule,ReactiveFormsModule,FormBuilder,FormControl,Validators,FormControlDirective,NgForm,FormGroupDirective,NgModel}        from '@angular/forms';
@Component({selector: 'app-dropdown', template: ''})
class DropdownComponentStub {}

import { DropdownComponent } from './dropdown.component';

describe('DropdownComponent', () => {
  let component: DropdownComponentStub;
  let fixture: ComponentFixture<DropdownComponentStub>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownComponentStub ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownComponentStub);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
