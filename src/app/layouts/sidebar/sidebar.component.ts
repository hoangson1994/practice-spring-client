import { Component, HostListener, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ROUTER_GROUPS } from '../../app-routing.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent implements OnInit {
  @Output() selectItem: EventEmitter<any>;
  fixedSideBarMd = false;
  routerGroups = [];

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.fixedSideBarMd = window.pageYOffset > 60;
  }
  constructor(private router: Router) {
    this.selectItem = new EventEmitter();
  }

  ngOnInit() {
    this.routerGroups = Object.values(ROUTER_GROUPS);
    this.onWindowScroll();
  }

  onSelectRoute() {
    this.selectItem.emit();
  }

  isSelected(url: string[]) {
    return this.router.isActive(this.router.createUrlTree(url), false);
  }
}
