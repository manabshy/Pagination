import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { SearchRoutingModule } from './searchRouting.module';

import { SearchComponent } from './search.component';
import { ResultsComponent } from './results/results.component';
import { PaginationComponent } from '../shared/pagination/pagination.component';

import { SearchService } from './shared/search.service';
import { ListModule } from '../shared/list/list.module';
import { PredefinedSearchesComponent } from '../search/predefined-searches/predefined-searches.component';

import { SearchResolve } from './search.resolve';
import { ResultsService } from './results/results.service';
import { PagerService } from './index';

import { SavedSearchesComponent } from '../search/saved-searches/saved-searches.component';
import { CardViewComponent } from './shared/card-view/card-view.component';
import { RecentlyModifiedComponent } from './recently-modified/recently-modified.component';

import { NavigationModule } from '../shared/navigation/navigation.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ListModule,
    FormsModule,
    ReactiveFormsModule,
    SearchRoutingModule,
    NavigationModule
  ],
  declarations: [
    SearchComponent,
    PredefinedSearchesComponent,
    ResultsComponent,
    SavedSearchesComponent,
    CardViewComponent,
    RecentlyModifiedComponent,
    PaginationComponent
  ],
  providers: [
    SearchService,
    SearchResolve,
    ResultsService,
    PagerService
  ],
  exports:[
    CardViewComponent,
    RouterModule
  ]
})
export class SearchModule { }
