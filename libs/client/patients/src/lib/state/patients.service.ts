import { Injectable } from '@angular/core';
import { UserDrivenCollectionService } from '@peerless/extensions/akita';

import { SessionService } from '@peerless/client/session';
import { CollectionConfig } from 'akita-ng-fire';

import { PatientsState, PatientsStore } from './patients.store';

@Injectable()
@CollectionConfig({ path: 'users/:uid/patients' })
export class PatientsService extends UserDrivenCollectionService<PatientsState> {
  constructor(store: PatientsStore, session: SessionService) {
    super(store, session);
  }
}
