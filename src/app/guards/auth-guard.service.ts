import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, Router} from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private _router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let user = localStorage.getItem('userName');
    if (!user) {
      this._router.navigate(['login']);
    }
    return true;
  }
}
