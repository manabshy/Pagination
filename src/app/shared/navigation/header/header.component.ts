// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-header',
//   templateUrl: './header.component.html',
//   styleUrls: ['./header.component.scss']
// })
// export class HeaderComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }
import { Component, OnInit } from '@angular/core';
import { LoginService}  from '../../../login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private userName: string;
  isLoggedIn: boolean = false;

  constructor( private _loginService: LoginService, private _router: Router) {
  }
  ngOnInit() {
    this.userName = localStorage.getItem('userName');
  }

  logout(): void {
    this._loginService.logout();
    this._router.navigate(['login']);
  }
}



