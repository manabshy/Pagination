import {Http, Response} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import {FieldBase} from '../field-templates/field-base';
import {TextboxField} from '../field-templates/text-field';
import {DropdownField} from '../field-templates/dropdown-field';
import {CheckboxField} from '../field-templates/checkbox-field';
import {RadioboxField} from '../field-templates/radiobox-field';

import { AppConfig } from '../../../common/config/app.config';

type Alphanumeric = string | number;

@Injectable()
export class FormDataService {

    constructor(private _http: Http, private appConfig:AppConfig) { }

    getData(formId: Alphanumeric): Observable<FieldBase<any>[]> {
        const url = this.appConfig.getKey('metaDataFields', {formId:formId});
        const fields: FieldBase<any>[] = [];
        
        return this._http.get(url)
            .map((res: Response) => {
                res.json().fieldDefinitions.forEach(field => {
                    if (field.type === 'Text') {
                        const textBox = new TextboxField(field);
                        fields.push(textBox);
                    } else if (field.type === 'dropdown') {
                        const dropBox = new DropdownField(field);
                        fields.push(dropBox);
                    }
                    else if (field.type === 'checkbox') {
                        const checkBox = new CheckboxField(field);
                        fields.push(checkBox);
                    }
                    else if (field.type === 'radio'){
                        const radioBox = new RadioboxField(field);
                        fields.push(radioBox);

                    }

                });
                return fields.sort((a, b) => a.order - b.order);
            })
            .catch(this.handleError)
            .do(data => {
                 //console.log('data in GetFieldDataService:::::' + JSON.stringify(data));
            });
    }

    private handleError(errors: any) {
        return Observable.throw(errors.messages);
    }

}
