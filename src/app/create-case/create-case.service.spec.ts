/* tslint:disable:no-unused-variable */

import {
    async,
    getTestBed,
    TestBed,
    inject
} from '@angular/core/testing';
import { AppConfig } from '../common/config/app.config';
import { CreateCaseService } from './create-case.service';
import { HttpHeaders } from '../common/config/http.headers';

import {
    BaseRequestOptions,
    Http,
    Response,
    ResponseOptions,
    XHRBackend,
    HttpModule
} from '@angular/http';
import {
    MockBackend,
    MockConnection
} from '@angular/http/testing';

describe('CreateCaseService', () => {
    let backend: MockBackend;
    let service: CreateCaseService;
    let caseId: string;
    const IS_DEV = true; 

  beforeEach(async() => {
    class AppConfigStub{
      getKey(){}
    }
    TestBed.configureTestingModule({
      providers: [
        BaseRequestOptions,
        MockBackend,
        {provide:AppConfig,useClass: AppConfigStub},
        HttpHeaders,
        { provide: 'IS_DEV', useValue: IS_DEV },
        CreateCaseService,
          {
              deps: [
                  MockBackend,
                  BaseRequestOptions,
              ],
              provide: Http,
              useFactory: (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
                  return new Http(backend, defaultOptions);
              }
          }
        
        ],
            imports:[HttpModule]

    });
    // ...configureTestingModule

      const testbed = getTestBed();
      backend = testbed.get(MockBackend);
      service = testbed.get(CreateCaseService);
      
    });
    function setupConnections(backend: MockBackend, options: any) {
        backend.connections.subscribe((connection: MockConnection) => {
            if (connection.request.url === 'http://localhost:8080/ccs/v1/cases/case-123') {
                const responseOptions = new ResponseOptions(options);
                const response = new Response(responseOptions);
                connection.mockRespond(response);
            }
        });
    }        

    it('should ...', inject([CreateCaseService], (service: CreateCaseService) => {
      expect(service).toBeTruthy();
    }));

    it('should return response', () => {
       setupConnections(backend, {
            body: [
                {
                    status: 'Ok',
                },
                {
                    status: 'Error',
                }
            ],
            status: 200
        });
        service.createCaseXHR(FormData,caseId).subscribe( data => {
              //console.log(data);
              //console.log(typeof data);
              expect(data).toBeTruthy();
              expect(data.length).toBe(2);
              expect(data[0].status).toBe('Ok');
              expect(data[1].status).toBe('Error');
          });    
    });
    it('should log an error to the console on error', () => {
        setupConnections(backend, {
            body: { error: `Error` },
            status: 404
        });
        spyOn(console, 'error');
        service.createCaseXHR(FormData,caseId).subscribe(null, () => {
            expect(console.error).toHaveBeenCalledWith(`Error`);
        });
        service.createCaseXHR(FormData,caseId).subscribe(data => {
            expect(data.error).toBeTruthy();
        });

    });       
    
});
