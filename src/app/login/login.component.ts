import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { User } from './user.model';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public user = new User('', '');
  public errorMsg = '';
  public loading = false;
  title = 'Welcome to this App.';
  public loggedIn = Boolean;

  constructor(private router: Router,
              private loginService: LoginService) {
  }
  login(): Boolean {
    let loggedIn;
    console.log('LoginComponent:' + this.user.email + ',' + this.user.password);
    this.loginService.getUsers();
    this.loginService.login(this.user)
      .subscribe(result => {
        if (result) {
             console.log('result' + result);
             loggedIn = result;
             this.router.navigate(['/']);
        } else {
          this.errorMsg = 'It seems your details are not correct. Please enter them again.';
          this.loading = false;
          loggedIn = result;
        }
      }, error => this.errorMsg = <any> error);
      return loggedIn;
  }
}
