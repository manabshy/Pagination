import { Component, Input, OnInit } from '@angular/core';
import { FormGroup,FormControl,FormBuilder } from '@angular/forms';
import { FieldBase } from '../field-templates/field-base';
@Component({
  selector: 'app-field-generator',
  templateUrl: './field-generator.component.html',
  styleUrls: ['./field-generator.component.css']
})
export class FieldGeneratorComponent implements OnInit {

  @Input() field: FieldBase<any>;
  @Input() form: FormGroup;
  @Input() formId;
  get isValid() { return this.form.controls[this.field.name].valid; }
  get isPristine() {return this.form.controls[this.field.name].pristine; }
  ngOnInit(){
  }
  constructor() { }
}
