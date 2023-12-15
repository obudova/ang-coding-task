import { Component, Inject } from '@angular/core';
import {
  EntityListItem,
  EntityServiceInterface,
  GetEntityListParams
} from '@angular-monorepo/entities/data-repository';
import { rxState } from '@rx-angular/state';
import { catchError, debounceTime, endWith, finalize, map, of, startWith, switchMap } from 'rxjs';
import { FormControl } from '@angular/forms';

interface State extends GetEntityListParams {
  entities: EntityListItem[];
  loading: boolean;
  error: boolean
}

@Component({
  selector: 'angular-monorepo-feature-list',
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.scss'],
})
export class FeatureListComponent {
  search: FormControl = new FormControl<string>('');

  _state = rxState<State>(({set, connect}) => {
    set({loading: true});
    connect(this.entityService.getEntityList({}).pipe(
      map((entities) => ({ entities})),
      catchError(() => of({ error: true })),
      // start with loading true
      startWith({ loading: true }),
      // when request completes, we can set loading to false
      endWith({ loading: false })
    ));
    connect(this.search.valueChanges.pipe(
      map((search) => ({ search})),
      debounceTime(300),

      switchMap(({search}) => {
        this._state.set({loading: true})
        return this.entityService.getEntityList({search: search?.trim()}).pipe(
          finalize(() => { this._state.set({loading: false})})
        )
      }),
      map((entities) => ({entities})),
    ))
  })

  entities$ = this._state.select('entities');
  loading$  = this._state.select('loading');

  constructor(@Inject('ENTITY_SERVICE') private entityService: EntityServiceInterface) {}
}
