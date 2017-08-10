import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http'; // may need header later, removed for linting
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {User} from './user.model';


@Injectable()
export class LoginService {

   isLoggedIn = false;
   user = {email: '', password: ''};

  private _userDataUrl = './assets/mock-data/userDb.json';
  private _users;

  constructor(private _http: Http) {}

  getUsers (): Observable<User[]> {
    // console.log('in getUsers');
    return this._http.get(this._userDataUrl)
                    .map(this.extractData)
                    // .do(data => console.log('In Login service data' + data)) // eyeball results in the console
                    .catch(this.handleError);
  }

  login(user: User): Observable<boolean> {
    return this._http.get(this._userDataUrl)
    .map((response: Response) => {
        this.extractData(response);
        return this.Authenticate(user);
      })
      // .do(data => console.log('data in loginService:' + JSON.stringify(data)))
      ._catch(this.handleError);

  }

  Authenticate (user: User): Boolean {
    // console.log("In Authenticate"  + this._users);
    let LoggedInUser = this._users.find(u => u.email === user.email && u.password === user.password);
    if (LoggedInUser) {
      // console.log('LoggedInUser:' + LoggedInUser);
      this.isLoggedIn = true;
      localStorage.setItem('userName', LoggedInUser.firstName + ' ' + LoggedInUser.lastName);
      return true;
    } else {
      this.isLoggedIn = false;
     // console.log('LoggedInUser:' + LoggedInUser);
      return false;
    }
  }


  private extractData(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    let body = res.json();
     // console.log('body:' + body );
     this._users = <User[]> res.json();
    return body.data || { };
  }

  private handleError(error: any) {
    // console.log(error);
    let errMsg = error.message || 'Server error';
    // console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
    // return Observable.throw('server error');
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    localStorage.removeItem('userName');
  }

}
