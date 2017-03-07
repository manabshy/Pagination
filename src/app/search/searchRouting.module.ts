import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { CommonModule } from '@angular/common';


import { SearchComponent } from './search.component';
import { ResultsComponent } from './results/results.component';
import { PredefinedSearchesComponent } from '../search/predefined-searches/predefined-searches.component';
import { SearchResolve } from './search.resolve';
import { SavedSearchesComponent } from '../search/saved-searches/saved-searches.component';
import { RecentlyModifiedComponent } from './recently-modified/recently-modified.component';


const SEARCH_ROUTES: Routes = [
    { path: '', component: SearchComponent,
      children:
        [
        { path: 'results', component: ResultsComponent, resolve: { criteria: SearchResolve } },
        { path: 'searches/predefined', component: PredefinedSearchesComponent},
        { path: 'searches/savedsearches', component: SavedSearchesComponent},
        { path: 'searches/recently-modified', component: RecentlyModifiedComponent },
        ]
  },
]
@NgModule({
  imports: [
    RouterModule.forChild(SEARCH_ROUTES)
  ],
  exports:[
    RouterModule
  ]
})
export class SearchRoutingModule { }
