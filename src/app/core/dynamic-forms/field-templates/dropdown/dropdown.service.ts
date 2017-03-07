import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { DropdownObj } from './dropdown.shared';

@Injectable()
export class DropdownService {
  
  private subject : Subject <DropdownObj> = new Subject<DropdownObj>();

  notify(options : DropdownObj) {
      this.subject.next(options);
  }

  getRegister() : Observable<DropdownObj> {
      return this.subject.asObservable();
  }
}

