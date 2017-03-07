import { TestBed, async, inject, fakeAsync } from '@angular/core/testing';
import { FieldControlService } from './field-control.service';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { HttpModule, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { FieldBase } from '../field-templates/field-base';

const fakeFormControl = () => [];

describe('FormDataService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        FieldControlService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  }));
  it('should ...', inject([FieldControlService], (service: FieldControlService) => {
    expect(service).toBeTruthy();
  }));
  it('can instantiate service when inject service',
    inject([FieldControlService], (service: FieldControlService) => {
      expect(service instanceof FieldControlService).toBe(true);
  }));
  it('can provide the mockBackend as XHRBackend',
    inject([XHRBackend], (backend: MockBackend) => {
      expect(backend).not.toBeNull('backend should be provided');
  }));
  describe('when get FormControl',() => {
    let backend: MockBackend;
      let service: FieldControlService;
      let fakeFormControl: FieldBase <any>[];
      let response: Response;
  })
});
  
  