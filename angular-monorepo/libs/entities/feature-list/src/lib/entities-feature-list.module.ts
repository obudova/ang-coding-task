import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureListComponent } from './feature-list/feature-list.component';
import { Route, RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';

const entitiesFeatureListRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: FeatureListComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(entitiesFeatureListRoutes),
    TableModule,
  ],
  declarations: [FeatureListComponent],
})
export class EntitiesFeatureListModule {}
