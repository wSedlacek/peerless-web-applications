import { createRoutingFactory, Spectator } from '@ngneat/spectator/jest';

import { FIRST_PATIENT } from '../../state';
import { PatientDetailsComponent } from './patient-details.component';

describe('PatientDetailsComponent', () => {
  let spectator: Spectator<PatientDetailsComponent>;
  const createComponent = createRoutingFactory({
    component: PatientDetailsComponent,
    params: { id: FIRST_PATIENT.id },
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
