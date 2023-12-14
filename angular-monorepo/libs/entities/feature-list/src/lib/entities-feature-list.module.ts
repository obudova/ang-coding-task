import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureListComponent } from './feature-list/feature-list.component';
import { Route, RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    InputTextModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [FeatureListComponent],
})
export class EntitiesFeatureListModule {}
