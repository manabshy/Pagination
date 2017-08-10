import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { LoginService } from './login.service';
import { FormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [FormsModule, BrowserModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    LoginService
  ]
})
export class LoginModule {}
