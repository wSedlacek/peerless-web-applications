import { Injectable } from '@angular/core';
import { ActiveState, EntityState, EntityStore, StoreConfig } from '@datorama/akita';

import { Patient } from './patient.model';

export interface PatientsState extends EntityState<Patient>, ActiveState {}

@Injectable()
@StoreConfig({ name: 'patients', resettable: true })
export class PatientsStore extends EntityStore<PatientsState> {
  constructor() {
    super();
  }
}
