import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrowseCoursesService } from 'src/app/services/browse-courses/browse-courses.service';

@Component({
  templateUrl: './browse-search.component.html',
  styleUrls: ['./browse-search.component.css'],
})
export class BrowseSearchComponent implements OnInit {
  search_query: string = '';
  search_results: any;
  search_results_count: number = 0;

  constructor(
    private route: ActivatedRoute,
    private browseCoursesService: BrowseCoursesService
  ) {
    this.route.params.subscribe((params) => {
      this.search_query = params['search_query'];
    });
  }

  ngOnInit(): void {
    this.browseCoursesService
      .get_search_query(this.search_query)
      .subscribe((res) => {
        this.search_results = res;
        this.search_results_count = res.length;
      });
  }
}
