import { Component } from '@angular/core';
import { Event, NavigationStart, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'angular-monorepo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'location-app';
  sidebarVisible = false;
  routerSub: Subscription;

  items = [
    {
      label: 'Entities',
      icon: 'pi pi-fw pi-compass',
      items: [
        {
          label: 'Homepage',
          icon: 'pi pi-fw pi-bookmark',
          routerLink: 'entity/homepage',
        },
        {
          label: 'List',
          icon: 'pi pi-fw pi-list',
          routerLink: 'entity/list',
        },
      ],
    },
    {
      label: 'Dashboards',
      icon: 'pi pi-fw pi-chart-bar',
      items: [
        {
          label: 'Location Dashboard',
          icon: 'pi pi-fw pi-chart-line',
          routerLink: 'dashboards/location',
        },
      ],
    },
  ];

  constructor(private router: Router) { }

  openSidebar() {
    this.sidebarVisible = true;
    this.routerSub = this.router.events.pipe(
      filter((e: Event  ): e is NavigationStart => e instanceof NavigationStart)
    ).subscribe((e: Event) => {
      this.closeSidebar();
    });
  }

  closeSidebar() {
    console.log('close')
    this.sidebarVisible = false;
    this.routerSub.unsubscribe();
  }
}
