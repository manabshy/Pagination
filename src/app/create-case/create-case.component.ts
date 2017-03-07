import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-create-case',
  templateUrl: './create-case.component.html',
  styleUrls: ['./create-case.component.scss']
})
export class CreateCaseComponent implements OnInit {
  public title;
  constructor(private activatedRoute: ActivatedRoute) { }
  public caseId;

  ngOnInit() {
    
    // subscribe to the router event
    this.activatedRoute.params.subscribe((params: Params) => {
        this.caseId = params['id'];
        return this.caseId;
      });
    this.title = "Case Id:" + this.caseId;

  }
}
