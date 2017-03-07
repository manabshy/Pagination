import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { AppConfig } from '../common/config/app.config';
import { HttpHeaders } from '../common/config/http.headers';

@Injectable()
export class CreateCaseService {

    constructor(private _http: Http, private appConfig:AppConfig, private httpHeaders:HttpHeaders) { }

    createCaseXHR (body: Object, caseId:string): Observable<any> {
        const url = this.appConfig.getKey('ingestionCase', {caseId:caseId});
        return this._http.post(url, body, this.httpHeaders.getHeaders() ) // ...using post request
                        .map((res:Response) => {
                            if((res.status == 201 || res.status == 200) && res.text() == '') {
                            return {status:'Success'};
                            }
                            return res.json();
                        }) // ...and calling .json() on the response to return data
                        .catch((error:any) => Observable.throw( error.json() )) //...errors if any
    }
  
    private reportError(error:any){
        try {
            error = error.json();
            console.error(error.error);
        } catch (error) {
            //..ignore
            console.error(error);            
        }
        return Observable.throw(error);
    }   
}
