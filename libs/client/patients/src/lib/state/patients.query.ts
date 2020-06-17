import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';

import { PatientsState, PatientsStore } from './patients.store';

@Injectable()
export class PatientsQuery extends QueryEntity<PatientsState> {
  constructor(store: PatientsStore) {
    super(store);
  }
}
