import { Component, Inject, Input, OnInit } from '@angular/core';
import { EntityServiceInterface } from '@angular-monorepo/entities/data-repository';
import { EntityDetails, EntityType, EntityUpdateDto } from '../../../../data-repository/src/lib/model/model';
import { Observable } from 'rxjs';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'angular-monorepo-entity-details',
  templateUrl: './entity-details.component.html',
  styleUrls: ['./entity-details.component.scss'],
})
export class EntityDetailsComponent implements OnInit {
  @Input()
  id: string

  entity: EntityDetails;
  visible = false

  types$: Observable<EntityType[]> = this.entityService.getEntityTypes();
  form: FormGroup = this.fb.group({
    trackingId: new FormControl(''),
    name: new FormControl(''),
    entityType: new FormControl('')
  })
  constructor(@Inject('ENTITY_SERVICE') private entityService: EntityServiceInterface, private fb: FormBuilder) {}

  ngOnInit() {
    if (this.id) {
      this.entityService.getEntityDetails(this.id).subscribe(val => {
        this.entity = val;
      });
    }
  }

  handleEdit() {
    this.entityService.updateEntity(this.form.value, this.id).subscribe((val) => {
      this.visible = false;
      this.entity = val;
    })
  }
}
