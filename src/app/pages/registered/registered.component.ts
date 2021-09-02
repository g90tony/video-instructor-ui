import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisteredCoursesService } from 'src/app/services/registered-course/registered-course.service';
import { UserProfileService } from 'src/app/services/user-profile/user-profile.service';

@Component({
  selector: 'app-registered',
  templateUrl: './registered.component.html',
  styleUrls: ['./registered.component.css'],
})
export class RegisteredComponent implements OnInit {
  registered_courses: any[];

  searchForm = new FormGroup({
    search: new FormControl(''),
  });

  constructor(
    private registeredCourseService: RegisteredCoursesService,
    private userProfileService: UserProfileService,
    private router: Router
  ) {
    this.registered_courses = [];
  }

  ngOnInit(): void {
    const user_profile = this.userProfileService.get_authenticated_profile();

    this.registeredCourseService.get_registered_courses().subscribe((res) => {
      this.registered_courses = res;
    });
  }

  onSubmit() {
    const form_data = this.searchForm.value;

    this.router.navigateByUrl(`/courses/registered/search/${form_data.search}`);
  }
}
