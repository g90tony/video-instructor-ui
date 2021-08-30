import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  constructor(private sidebarToggler: SidebarService) {}

  ngOnInit(): void {
    this.sidebarToggler.initSidebar();
  }

  toggleSidebar() {
    this.sidebarToggler.toggleSidebar();
  }
}
