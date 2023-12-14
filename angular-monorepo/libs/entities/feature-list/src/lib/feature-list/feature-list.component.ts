import { Component, Inject } from '@angular/core';
import { EntityServiceInterface } from '@angular-monorepo/entities/data-repository';
import { RxState } from '@rx-angular/state';
import { GetEntityListParams } from '../../../../data-repository/src/lib/model/model';

interface State extends GetEntityListParams{

}
@Component({
  selector: 'angular-monorepo-feature-list',
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.scss'],
  providers: [RxState],
})
export class FeatureListComponent {

  entities$ = this.entityService.getEntityList(this._state.get())

  constructor(@Inject('ENTITY_SERVICE') private entityService: EntityServiceInterface,
              private _state: RxState<State>) { }
}
