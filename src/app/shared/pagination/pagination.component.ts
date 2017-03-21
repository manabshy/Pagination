import { Component, OnInit,OnChanges, EventEmitter, Output, Input } from '@angular/core';
import * as _ from 'underscore';
import { PagerService } from '../../search/index'

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges {

  constructor(private pagerService: PagerService) { }

  @Input() dataset: Array<any>
  @Output() setPageClick: EventEmitter<any> = new EventEmitter<any>();

  page: number = 1;
  limit: number = 10;
  hasData: boolean = false;
  private allItems: any[];


  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];

  ngOnChanges() {
    this.setPage(1);
  }
  setPage(page: number) {
    console.log("this.pager.totalPages" + this.pager.totalPages);
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
     this.hasData = (this.dataset !== undefined) ? true : false;
    console.log('pagination com:' + this.hasData); 
    if (this.hasData && this.dataset.length > 0) {

      console.log("pagination component:" + this.dataset.length);

      this.pager = this.pagerService.getPager(this.dataset.length, page);

      console.log(this.pager);
      // get current page of items
      this.pagedItems = this.dataset.slice(this.pager.startIndex, this.pager.endIndex + 1);
      console.log("in Pagination Component: Before Emit:",  this.pagedItems);
      this.setPageClick.emit(this.pagedItems);
    }
  }
}
