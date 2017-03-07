import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FieldBase } from '../field-templates/field-base';

@Injectable()
export class FieldControlService {
  constructor() { }

  toFormGroup(data: FieldBase<any>[]) {
    const group: any = {};
    data.forEach(field => {
      group[field.name] = field.mandatory ? new FormControl(field.value || '', Validators.required)
        : new FormControl(field.value || '');
    });
    return new FormGroup(group);
  }
}

