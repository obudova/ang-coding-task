import { Component, DestroyRef, inject, Inject, Input, OnInit } from '@angular/core';
import { EntityServiceInterface } from '@angular-monorepo/entities/data-repository';
import { EntityDetails, EntityType, } from '@angular-monorepo/entities/data-repository';
import { catchError, finalize, Observable } from 'rxjs';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'angular-monorepo-entity-details',
  templateUrl: './entity-details.component.html',
  styleUrls: ['./entity-details.component.scss'],
  providers: [],
})
export class EntityDetailsComponent implements OnInit {
  @Input()
  id: string;

  entity: EntityDetails;
  visibleModal = false;
  loading = true;
  destroyRef = inject(DestroyRef)

  types$: Observable<EntityType[]> = this.entityService.getEntityTypes();
  form: FormGroup = this.fb.group({
    trackingId: new FormControl(''),
    name: new FormControl(''),
    entityType: new FormControl(''),
  });
  constructor(
    @Inject('ENTITY_SERVICE') private entityService: EntityServiceInterface,
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    if (this.id) {
      this.fetchEnitity();
    }
  }

  fetchEnitity() {
    this.entityService
      .getEntityDetails(this.id)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe((val) => {
        this.entity = val;
      });
  }

  handleEdit() {
    this.entityService
      .updateEntity(this.form.value, this.id)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((e) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error occurred',
            detail: `Employee wasn't updated due to error`,
          });
          throw e;
        })
      )
      .subscribe(
        (val) => {
          this.visibleModal = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Employee was updated',
            detail: `${this.entity.name} was successfully updated`,
          });
          this.entity = val;
        },
        (error) => {
          this.router.navigate(['/entity/list']);
        }
      );
  }
}
