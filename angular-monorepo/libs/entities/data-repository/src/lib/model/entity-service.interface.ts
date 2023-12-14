import {
  EntityDetails,
  EntityListItem,
  EntityType,
  EntityUpdateDto,
  GetEntityListParams,
  LocationStats,
} from './model';
import { Observable } from 'rxjs';

export interface EntityServiceInterface {
  getEntityList(
    getEntityListParams: GetEntityListParams
  ): Observable<EntityListItem[]>;

  getEntityDetails(entityId: string): Observable<EntityDetails>;

  updateEntity(
    entityUpdateDto: EntityUpdateDto,
    entityId: string
  ): Observable<EntityDetails>;

  getEntityTypes(): Observable<EntityType[]>;

  getLocationStats(): Observable<LocationStats>;
}
