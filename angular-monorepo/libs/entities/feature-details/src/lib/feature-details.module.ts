import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { EntityDetailsComponent } from './entity-details/entity-details.component';
import { ChipModule } from 'primeng/chip';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';

const entitiesFeatureDetailsRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: EntityDetailsComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(entitiesFeatureDetailsRoutes),
    ChipModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
    ReactiveFormsModule,
  ],
  declarations: [EntityDetailsComponent],
})
export class FeatureDetailsModule {}
