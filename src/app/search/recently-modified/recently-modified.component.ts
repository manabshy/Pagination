import { Component, OnInit } from '@angular/core';

import { ListComponent } from '../../shared/list/list.component';
import { SearchService } from '../shared/search.service';

@Component({
  selector: 'app-recently-modified',
  templateUrl: './recently-modified.component.html'
})
export class RecentlyModifiedComponent implements OnInit {

  searchResult: any;
  resultRows:Array<any> = [];

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.searchService.getModifiedSearches()
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
      });
  }

}
