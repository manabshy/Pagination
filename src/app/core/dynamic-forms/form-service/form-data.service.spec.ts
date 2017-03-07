import { TestBed, async, inject, fakeAsync } from '@angular/core/testing';
import { FormDataService } from './form-data.service';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { HttpModule, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { IFormData } from './iform-data.interface';
import { Observable } from 'rxjs/Observable';

import { AppConfig } from '../../../common/config/app.config';
import { HttpHeaders } from '../../../common/config/http.headers';

const FormData = [
  {
    'key': 'documentId',
    'label': 'Document Id',
    'value': '999',
    'limit': 5,
    'required': true,
    'order': 1,
    'controlType': 'text'
  },
  {
    'key': 'Email',
    'label': 'Email',
    'order': 2,
    'controlType': 'text',
    'value': 'test@email.com'
  },
 {
    'key': 'Email1',
    'label': 'Email1',
    'order': 3,
    'controlType': 'text',
    'value': 'test@email.com'
  }  
];

describe('FormDataService', () => {
  const IS_DEV = true; 
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        FormDataService,
        AppConfig,
        { provide: 'IS_DEV', useValue: IS_DEV },
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  }));

  it('should ...', inject([FormDataService], (service: FormDataService) => {
    expect(service).toBeTruthy();
  }));

  it('can instantiate service when inject service',
    inject([FormDataService], (service: FormDataService) => {
      expect(service instanceof FormDataService).toBe(true);
    }));

  it('can instantiate service with "new"',
    inject([Http, AppConfig], (http: Http, appConfig:AppConfig) => {
      const service = new FormDataService(http, appConfig);
      expect(service instanceof FormDataService).toBe(true);
    }));

  it('can provide the mockBackend as XHRBackend', inject([XHRBackend], (backend: MockBackend) => {
    expect(backend).not.toBeNull();
  }));

  describe('when load form-data', () => {
    let backend: MockBackend;
    let response: Response;
    let fakeData;
    let service: FormDataService;

    beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend,appConfig:AppConfig) => {
      service = new FormDataService(http,appConfig);
      backend = be;
      fakeData = FormData;
      const options = new ResponseOptions({ status: 200, body: fakeData });
      response = new Response(options);
    }));

  });

});
