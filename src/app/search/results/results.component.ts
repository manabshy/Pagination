import { Component, OnInit,AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, Subject} from "rxjs";

import { SearchService } from '../../search/shared/search.service';
import { ListComponent } from '../../shared/list/list.component';

import { FieldsComponent } from '../../shared/fields/fields.component';
import { ResultsService } from './results.service';
import * as _ from 'underscore';
import { PagerService } from '../index'

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html'
})
export class ResultsComponent implements OnInit {
  form: FormGroup;
  fieldsList: Array<any>;
  searchResult: any;
  resultRows: Array<any> = [];
  resultsCols: Array<any> = [];


   terms: string = "";
   private searchTermStream = new Subject<string>();

   page: number = 1;
   limit: number = 10;
   private pageStream = new Subject<number>();
    // array of all items to be paged
    private allItems: any[];

    // pager object
    pager: any = {};

    // paged items
    pagedItems: any[];


  constructor(private searchService: SearchService,
              private resultService: ResultsService,
              private pagerService: PagerService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.resultService.setData(this.route.snapshot.data['criteria']);
    this.fieldsList = this.resultService.format();
    
    this.updateMetaDataFields(this.fieldsList);
    this.performSearch(null);

  }

  performSearch(event) {
    if (event) {
      this.resultService.updateData(this.form.value);
    }

  
    this.searchService.searchDocuments(this.resultService.json())    
      .subscribe((response) => {
        this.searchResult = response;
        if (this.searchResult.length) {
          for (var i = 0; i < this.searchResult.length; i++) {
            this.resultRows.push(this.searchResult[i].metadata.metadataMap);
          }
          const obj: any = this.searchResult[0];
          const metaobj: any = this.searchResult[0].metadata.metadataMap;
          for (var i = 0; i < this.searchResult.length; i++) {
            Object.assign(this.searchResult[i], this.resultRows[i]);

          }

        }
        this.setPage(1);

      });

  }

    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }

        // get pager object from service
       console.log(this.searchResult.length);
       this.pager = this.pagerService.getPager(this.searchResult.length, page);
       console.log(this.pager);
        // get current page of items
        this.pagedItems = this.searchResult.slice(this.pager.startIndex, this.pager.endIndex + 1);
        console.log(this.pagedItems);
  }


  private updateMetaDataFields(fieldList) {
    let group: any = {};

    fieldList.forEach((field) => {
      const fieldControl = new FormControl(field.value || '');
      group[field.name] = fieldControl;
    });

    this.form = new FormGroup(group);
  }  
}