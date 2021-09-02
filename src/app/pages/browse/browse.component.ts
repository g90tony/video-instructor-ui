import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BrowseCoursesService } from 'src/app/services/browse-courses/browse-courses.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css'],
})
export class BrowseComponent implements OnInit {
  api_results: any[];
  searchForm = new FormGroup({
    search: new FormControl(''),
  });

  constructor(
    private browseCourseService: BrowseCoursesService,
    private router: Router
  ) {
    this.api_results = [];
  }

  ngOnInit(): void {
    this.browseCourseService.get_all_courses().subscribe((res) => {
      this.api_results = res;
    });
  }

  onSubmit() {
    const form_data = this.searchForm.value;

    this.router.navigateByUrl(`/courses/browse/search/${form_data.search}`);
  }
}
