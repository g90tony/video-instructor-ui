import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegisteredCoursesService } from 'src/app/services/registered-course/registered-course.service';

@Component({
  templateUrl: './registered-search.component.html',
  styleUrls: ['./registered-search.component.css'],
})
export class RegisteredSearchComponent implements OnInit {
  search_query: string = '';
  search_results: any;
  search_results_count: number = 0;

  constructor(
    private route: ActivatedRoute,
    private registeredCoursesService: RegisteredCoursesService
  ) {
    this.route.params.subscribe((params) => {
      this.search_query = params['search_query'];
    });
  }

  ngOnInit(): void {
    this.registeredCoursesService
      .get_search_query(this.search_query)
      .subscribe((res) => {
        console.log(res);
        this.search_results = res;
        this.search_results_count = res.length;
      });
  }
}
