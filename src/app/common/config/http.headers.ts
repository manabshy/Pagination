import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class HttpHeaders {

    constructor() { }

    getHeaders(param1:string = 'json') {
        const headers = new Headers();
        headers.append('Authorization', 'Basic am9lOmJsb2dnc3B3ZA==');
        
        if(param1 === 'json') {
            headers.append('Content-Type', 'application/json');
        } else if(param1 == 'file') {
            // headers.append('Content-Type', 'multipart/form-data');
        }

        return new RequestOptions({ headers: headers });
    }

}
