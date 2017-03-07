import { Component, OnInit } from '@angular/core';
import { AppConfig } from './common/config/app.config';
import { Http } from '@angular/http';
import { FormDataService } from './core/dynamic-forms/form-service/form-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {

  title = 'CCS-UI Dynamic Form';

  constructor() { }

  ngOnInit() { }
}
