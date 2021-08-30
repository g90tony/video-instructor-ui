import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  sidebarIsOpen: boolean = true;
  sidebar: any;

  constructor() {}

  initSidebar = () => {
    this.sidebar = document.getElementById('sidebar-container');
    this.sidebarIsOpen ? this.closeSidebar() : this.openSidebar();
  };

  closeSidebar = () => {
    this.sidebar.style.width = '0';
    this.sidebar.style.transition = '750ms ease-in-out';
    this.sidebarIsOpen = false;
  };

  openSidebar = () => {
    this.sidebar.style.width = '200px';
    this.sidebar.style.transition = '750ms ease-in';
    this.sidebarIsOpen = true;
  };

  toggleSidebar() {
    this.sidebarIsOpen ? this.closeSidebar() : this.openSidebar();
  }
}
