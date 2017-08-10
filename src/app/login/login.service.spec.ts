/* tslint:disable:no-unused-variable */
import {
   async, inject, TestBed
} from '@angular/core/testing';

import {
  MockBackend,
  MockConnection
} from '@angular/http/testing';

import {
  HttpModule, Http, XHRBackend, Response, ResponseOptions
} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

import { User } from './user.model';
import { LoginService } from './login.service';

const makeUserData = () =>
[
  {'email': 'ali@qa.com' , 'password': 'a', 'firstName': 'M', 'lastName': 'Ali'},
  {'email': 'mj@qa.com' , 'password': 'm', 'firstName': 'MJ', 'lastName': 'B'},
  {'email': 'ty@qa.com' , 'password': 't', 'firstName': 'Terry', 'lastName': 'B'},
  {'email': 'hugo@qa.com' , 'password': 'password123', 'firstName': 'Hugo', 'lastName': 'Rente'},
  {'email': 'shahid@qa.com' , 'password': 'password123', 'firstName': 'Shahid', 'lastName': 'S'},
  {'email': 'prabhu@qa.com' , 'password': 'password123', 'firstName': 'Prabhu', 'lastName': 'P'}

] as User[];

describe('Service: Login', () => {
  beforeEach( async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [
        LoginService,
        { provide: XHRBackend, useClass: MockBackend }
      ]})
   .compileComponents();
  }));

  it('should check for LoginService', inject([LoginService], (service: LoginService) => {
    expect(service).toBeTruthy();
  }));
  it('can instantiate service when inject service',
    inject([LoginService], (service: LoginService) => {
      expect(service instanceof LoginService).toBe(true);
  }));

  it('can instantiate service with "new"', inject([Http], (http: Http) => {
      expect(http).not.toBeNull('http should be provided');
      let service = new LoginService(http);
      expect(service instanceof LoginService).toBe(true, 'new service should be ok');
    }));

  it('can provide the mockBackend as XHRBackend',
      inject([XHRBackend], (backend: MockBackend) => {
        expect(backend).not.toBeNull('backend should be provided');
  }));
  describe('when getUsers', () => {
      let backend: MockBackend;
      let service: LoginService;
      let fakeUsers: User[];
      let response: Response;

      beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
        backend = be;
        service = new LoginService(http);
        fakeUsers = makeUserData();
        let options = new ResponseOptions({status: 200, body: {data: fakeUsers}});
        response = new Response(options);
      }));

      it('should have expected fake users (then)', async(inject([], () => {
        backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

        service.getUsers().toPromise()
          // .then(() => Promise.reject('deliberate'))
          .then(users => {
          //  console.log('users.length:' + users.length);

            expect(users.length).toBe(fakeUsers.length,
              'should have expected no. of users');
          });
      })));

      it('should have expected fake users (Observable.do)', async(inject([], () => {
        backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

        service.getUsers()
          .do(users => {
            expect(users.length).toBe(fakeUsers.length,
              'should have expected no. of users');
          })
          .toPromise();
      })));


      it('should be OK returning no users', async(inject([], () => {
        let resp = new Response(new ResponseOptions({status: 200, body: {data: []}}));
        backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

        service.getUsers()
          .do(users => {
            expect(users.length).toBe(0, 'should have no users');
          })
          .toPromise();
      })));

      it('should treat 404 as an Observable error', async(inject([], () => {
        let resp = new Response(new ResponseOptions({status: 404}));
        backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

        service.getUsers()
          .do(users => {
            fail('should not respond with users');
          })
          .catch(err => {
            expect(err).toMatch(/Bad response status/, 'should catch bad response status code');
            return Observable.of(null); // failure is the expected test result
          })
          .toPromise();
      })));
  });
});
