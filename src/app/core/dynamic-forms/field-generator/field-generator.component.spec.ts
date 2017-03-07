/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement,Component } from '@angular/core';
import { FormGroup,FormsModule,ReactiveFormsModule,FormBuilder,FormControl,Validators,FormControlDirective,NgForm,FormGroupDirective,NgModel}        from '@angular/forms';
@Component({selector: 'app-field-generator', template: ''})
class FormFieldComponentStub {}


describe('FieldGeneratorComponent', () => {
  let component: FormFieldComponentStub;
  let fixture: ComponentFixture<FormFieldComponentStub>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormFieldComponentStub ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFieldComponentStub);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
