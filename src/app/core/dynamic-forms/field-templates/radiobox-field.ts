import { FieldBase } from './field-base';

export class RadioboxField extends FieldBase<string> {
    controlType = 'radio';
    options: { key: string, value: string }[] = [];

    constructor(options: {} = {}) {
        super(options);
        this.options = options['options'] || [];
    }
}


