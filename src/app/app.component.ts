import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { ROUTER_GROUPS } from './app-routing.module';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  form = new FormGroup({
    image: new FormControl()
  });
  drawerSidebarVisible = false;
  isMobileScreen = false;
  constructor(private router: Router, private title: Title) { }
  ngOnInit(): void {
    this.onResize();
    this.router.events.subscribe((ev: RouterEvent) => {
      if (ev instanceof NavigationEnd) {
        for (const route of Object.values(ROUTER_GROUPS)) {
          const groupRoute = route.path;
          if (route.children) {
            for (const child of route.children) {
              if (this.router.isActive(this.router.createUrlTree([groupRoute, child.path]), false)) {
                this.title.setTitle(child.data.name);
              }
            }
          }
        }
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event = null) {
    this.isMobileScreen = window.innerWidth <= 767;
  }

  triggerMobileMenuDrawer() {
    this.drawerSidebarVisible = !this.drawerSidebarVisible;
  }

  submit() {
    console.log(this.form.value);
  }
}
