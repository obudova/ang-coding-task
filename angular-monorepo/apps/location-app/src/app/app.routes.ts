import { Route } from '@angular/router';
import { HomepageComponent } from '@angular-monorepo/entities/feature-homepage';

export const appRoutes: Route[] = [
  {
    path: 'entity',
    children: [
      {
        path: 'homepage',
        component: HomepageComponent,
      },
      {
        path: 'list',
        loadChildren: () =>
          import('@angular-monorepo/entities/feature-list').then(
            (m) => m.EntitiesFeatureListModule
          ),
      },
      {
        path: ':id',
        loadChildren: () =>
          import('@angular-monorepo/entities/feature-details').then(
            (m) => m.FeatureDetailsModule
          ),
      }
    ],
  },
  {
    path: 'dashboards',
    children: [
      {
        path: 'location',
        loadChildren: () =>
          import('@angular-monorepo/entities/feature-location-dashboard').then(
            (m) => m.EntitiesFeatureLocationDashboardModule
          ),
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'entity/homepage',
  },
];
