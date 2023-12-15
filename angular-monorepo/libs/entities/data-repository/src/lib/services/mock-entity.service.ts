import { Injectable } from '@angular/core';
import {
  Employee,
  EmployeeVisits,
  EntityDetails,
  EntityListItem,
  EntityType,
  EntityUpdateDto,
  GetEntityListParams,
  LocationStats,
} from '../model/model';
import { delay, Observable, of, throwError } from 'rxjs';
import { EntityServiceInterface } from '../model/entity-service.interface';

@Injectable()
export class MockEntityService implements EntityServiceInterface {
  entities: EntityDetails[] = [
    {
      entityId: '1',
      trackingId: 'ab:cd:ef:5d:7a',
      name: 'Entity 1',
      entityType: 'n1t',
      entityStatus: 'On Duty',
      isActive: true,
      attributes: [
        'Department1',
        'Fast Responder',
        'xyakf83kfdasf930-fksdf0239-12303-46340129394',
        'Morning Shift',
      ],
    },
    {
      entityId: '2',
      trackingId: 'ac:cd:ef:4d:7a',
      name: 'Entity 2',
      entityType: 'n1t',
      entityStatus: 'Break',
      isActive: true,
      attributes: [
        'Department1',
        'Fast Responder',
        'xyakf83kfdasf930-fksdf0239-12303-46340129394',
        'Morning Shift',
      ],
    },
    {
      entityId: '3',
      trackingId: 'af:cd:ef:5d:8a',
      name: 'Entity 3',
      entityType: 'n2t',
      entityStatus: 'On Duty',
      isActive: true,
      attributes: [
        'Department1',
        'Fast Responder',
        'xyakf83kfdasf930-fksdf0239-12303-46340129394',
        'Morning Shift',
      ],
    },
    {
      entityId: '4',
      trackingId: 'af:cf:ef:5d:9a',
      name: 'Entity 4',
      entityType: 'n2t',
      entityStatus: 'Break',
      isActive: false,
      attributes: [
        'Department1',
        'Fast Responder',
        'xyakf83kfdasf930-fksdf0239-12303-46340129394',
        'Morning Shift',
      ],
    },
  ];

  entityTypes: EntityType[] = [
    { id: 'n1t', name: 'Nurse' },
    { id: 'n2t', name: 'Security' },
  ];

  lastWeekLocationOccupancy: number[] = [40, 245, 235, 182, 143, 120, 20];

  lastWeekVisitsLog: Employee[] = [
    { id: 'id1', name: 'Jacob Holland' },
    { id: 'id1', name: 'Jacob Holland' },
    { id: 'id2', name: 'Charles Bradley' },
    { id: 'id3', name: 'Mason Moore' },
    { id: 'id4', name: 'Alice Kelly' },
    { id: 'id3', name: 'Mason Moore' },
    { id: 'id1', name: 'Jacob Holland' },
    { id: 'id2', name: 'Charles Bradley' },
    { id: 'id3', name: 'Mason Moore' },
    { id: 'id4', name: 'Alice Kelly' },
    { id: 'id3', name: 'Mason Moore' },
    { id: 'id1', name: 'Jacob Holland' },
    { id: 'id2', name: 'Charles Bradley' },
    { id: 'id3', name: 'Mason Moore' },
    { id: 'id4', name: 'Alice Kelly' },
    { id: 'id3', name: 'Mason Moore' },
    { id: 'id1', name: 'Jacob Holland' },
    { id: 'id2', name: 'Charles Bradley' },
    { id: 'id3', name: 'Mason Moore' },
    { id: 'id4', name: 'Alice Kelly' },
    { id: 'id3', name: 'Mason Moore' },
    { id: 'id1', name: 'Jacob Holland' },
    { id: 'id2', name: 'Charles Bradley' },
    { id: 'id1', name: 'Jacob Holland' },
    { id: 'id2', name: 'Charles Bradley' },
    { id: 'id1', name: 'Jacob Holland' },
    { id: 'id2', name: 'Charles Bradley' },
    { id: 'id1', name: 'Jacob Holland' },
    { id: 'id2', name: 'Charles Bradley' },
    { id: 'id1', name: 'Jacob Holland' },
    { id: 'id2', name: 'Charles Bradley' },
    { id: 'id3', name: 'Mason Moore' },
    { id: 'id4', name: 'Alice Kelly' },
    { id: 'id3', name: 'Mason Moore' },
    { id: 'id4', name: 'Alice Kelly' },
    { id: 'id3', name: 'Mason Moore' },
    { id: 'id4', name: 'Alice Kelly' },
    { id: 'id3', name: 'Mason Moore' },
    { id: 'id4', name: 'Alice Kelly' },
    { id: 'id5', name: 'Rachel Gray' },
    { id: 'id6', name: 'Alexis Morales' },
    { id: 'id1', name: 'Jacob Holland' },
    { id: 'id1', name: 'Jacob Holland' },
  ];

  getEntityList(
    getEntityListParams: GetEntityListParams
  ): Observable<EntityListItem[]> {
    const search = getEntityListParams?.search;
    if (search) {
     const filtered = this.entities.filter((item) => (item.trackingId?.toLowerCase() + item.name.toLowerCase()).includes(search))

      return this.delayedResponse(of(filtered));
    }
    return this.delayedResponse(of(this.entities));
  }

  getEntityDetails(entityId: string): Observable<EntityDetails> {
    const entity =
      this.entities.find((e) => e.entityId === entityId) || this.emptyEnitity;
    return this.delayedResponse(of(entity));
  }

  updateEntity(
    entityUpdateDto: EntityUpdateDto,
    entityId: string
  ): Observable<EntityDetails> {
    // Update the entity in the mock data
    const updatedEntity =
      this.entities.find((e) => e.entityId === entityId) || this.emptyEnitity;
    Object.assign(updatedEntity, entityUpdateDto);
    return this.delayedResponse(of(updatedEntity));
  }

  getEntityTypes(): Observable<EntityType[]> {
    return this.delayedResponse(of(this.entityTypes));
  }

  getLocationStats(): Observable<LocationStats> {
    const locationStats: LocationStats = {
      lastWeekLocationOccupancy: this.lastWeekLocationOccupancy,
      lastWeekEmployeesVisits: this.getLastWeekEmployeesVisits(),
    };
    return this.delayedResponse(of(locationStats));
  }

  private getLastWeekEmployeesVisits(): EmployeeVisits[] {
    const OccurrencesMap = new Map<string, number>();

    this.lastWeekVisitsLog.forEach((employee) => {
      const name = employee.name;

      if (OccurrencesMap.has(name)) {
        // Increment the count if the ID is already in the map
        OccurrencesMap.set(name, OccurrencesMap.get(name)! + 1);
      } else {
        // Initialize the count if the ID is encountered for the first time
        OccurrencesMap.set(name, 1);
      }
    });

    return [...OccurrencesMap].map(([name, visits]) => ({ name, visits }));
  }

  get emptyEnitity(): EntityDetails {
    return {
      entityId: '',
      trackingId: '',
      name: '',
      entityType: '',
      entityStatus: '',
      isActive: false,
      attributes: [],
    };
  }

  private delayedResponse<T>(obs: Observable<T>): Observable<T> {
    const probability = Math.random();
    // const shouldError = probability <= 0.1; // 10% probability of error
    // const shouldError = probability < 0.1; // 10% probability of error
    const shouldError = false; // we have ideal API for demo :0
    return shouldError
      ? throwError(new Error('Simulated 403 Forbidden Error'))
      : obs.pipe(delay(1000));
  }
}
