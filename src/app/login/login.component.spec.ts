/* tslint:disable:no-unused-variable */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { LoginComponent } from './login.component';
import { LoginService } from './login.service';
import { SpyLocation }  from '@angular/common/testing';


describe('LoginComponent', () => {

let component: LoginComponent;
let fixture: ComponentFixture<LoginComponent>;
let loginService: LoginService; // the TestBed injected service
let componentLoginService: LoginService; // the actually injected service
let loginBtn: DebugElement;
let loginServiceStub: {
    isLoggedIn: boolean;
    user: { email: string, password: string}
  };
let location: SpyLocation;

  function expectPathToBe(path: string, expectationFailOutput?: any) {
    // console.log('location:' + location);
    expect('/login').toEqual(path, expectationFailOutput || 'location.path()');
  }

  beforeEach(async(() => {

    // stub UserService for test purposes
    loginServiceStub = {
      isLoggedIn: true,
      user: { email: 'test@test.com', password: 'test'}
    };
    class RouterStub {
      navigateByUrl(url: string) { return url; }
    }
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers:    [ // {provide: LoginService}, //Don't provide a real service,provide a test double instead
                      {provide: LoginService , useValue: loginServiceStub },
                      {provide: Router, useClass: RouterStub } ],
      imports: [ FormsModule ]
    })
    .compileComponents(); // compile template and css
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    loginBtn  = fixture.debugElement.query(By.css('.btn'));
    fixture.detectChanges();

    // LoginService actually injected into the component
    loginService = fixture.debugElement.injector.get(LoginService);
    componentLoginService = loginService;
    // loginService from the root injector
    loginService = TestBed.get(LoginService);

  }));
  it('check for Login component', () => {
    expect(component).toBeTruthy();
  });
  it('should check for title', () => {
    let de = fixture.debugElement.query(By.css('p.card-title'));
    expect(de.nativeElement.textContent).toContain(component.title);
  });
  it('should check for input fields Email and Password', () => {
    fixture.detectChanges();

    let emailInput = fixture.debugElement.query(By.css('input[name="email"]')).nativeElement;
    let passwordInput = fixture.debugElement.query(By.css('input[name="password"]')).nativeElement;

    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
  });
  it('should request login if not logged in', () => {
    loginServiceStub.isLoggedIn = false; // welcome message hasn't been shown yet
    fixture.detectChanges();

    let de = fixture.debugElement.query(By.css('button'));
    let el = de.nativeElement;
    const content = el.textContent;

    expect(content).toMatch(/Login/i, '"Login"');

  });

  it('should inject the component\'s UserService instance',
    inject([LoginService], (service: LoginService) => {
    expect(service).toBe(componentLoginService);
  }));

  it('TestBed and Component UserService should be the same', () => {
    expect(loginService === componentLoginService).toBe(true);

  });

  it('stub object and injected UserService should not be the same', () => {
    expect(loginServiceStub === loginService).toBe(false);
    // Changing the stub object has no effect on the injected service
    loginServiceStub.isLoggedIn = false;
    expect(loginService.isLoggedIn).toBe(true);
  });
  /***************************************************************************************/
  it('check if on a login page',
    inject([Router], (router: Router) => { // ...
    // console.log('loginBtn::' + loginBtn);  
    loginBtn.triggerEventHandler('click', null);
    expect(loginBtn).toBeDefined();

    expectPathToBe('/login');
    const spy = spyOn(router, 'navigateByUrl');
    // console.log('spy:' + spy);
  }));
});

