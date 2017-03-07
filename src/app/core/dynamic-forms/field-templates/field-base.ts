export class FieldBase<T>{
  value: T;
  key: string;
  name:string;
  label: string;
  mandatory: boolean;
  order: number;
  controlType: string;
  dependent : Object;

  constructor(options: {
      value?: T,
      key?: string,
      name?: string,
      label?: string,
      mandatory?: boolean,
      order?: number,
      controlType?: string,
      dependent? : Object
    } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.name = options.name || '';
    this.label = options.label || '';
    this.mandatory = !!options.mandatory;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.dependent = options.dependent || [];
  }
}


