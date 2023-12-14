import { Component, Inject } from '@angular/core';
import { EntityServiceInterface } from '@angular-monorepo/entities/data-repository';
import { RxState } from '@rx-angular/state';
import { EntityListItem, GetEntityListParams } from '../../../../data-repository/src/lib/model/model';
import { debounceTime, switchMap } from 'rxjs';
import { FormControl } from '@angular/forms';

interface State extends GetEntityListParams {
  entities: EntityListItem[];

}

@Component({
  selector: 'angular-monorepo-feature-list',
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.scss'],
  providers: [RxState],
})
export class FeatureListComponent {

  entities$ = this._state.select('entities');

  search: FormControl = new FormControl<string>('');

  constructor(@Inject('ENTITY_SERVICE') private entityService: EntityServiceInterface,
              private _state: RxState<State>) {

    this._state.connect('entities', this.entityService.getEntityList(this._state.get()));
    this._state.connect('search', this.search.valueChanges);

    this._state.connect('entities', this._state.select('search').pipe(
      debounceTime(300),
      switchMap((value) => {
        return this.entityService.getEntityList({search: value?.trim()})
      })), (state, newEntities) => (newEntities))

  }
}
