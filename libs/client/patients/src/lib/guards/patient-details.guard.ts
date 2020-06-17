import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { CollectionGuard, CollectionGuardConfig } from 'akita-ng-fire';
import { Observable } from 'rxjs';

import { Patient, PatientsService, PatientsState } from '../state';

@Injectable()
@CollectionGuardConfig({ awaitSync: true })
export class PatientDetailsGuard extends CollectionGuard<PatientsState> {
  constructor(protected readonly service: PatientsService) {
    super(service);
  }

  @Override()
  public sync(next: ActivatedRouteSnapshot): Observable<Patient> {
    return this.service.syncActiveWhileLoggedIn({ id: next.params.id });
  }
}
