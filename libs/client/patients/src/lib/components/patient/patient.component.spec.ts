import { createRoutingFactory, Spectator } from '@ngneat/spectator/jest';

import { FIRST_PATIENT } from '../../state';
import { PatientComponent } from './patient.component';

describe('PatientComponent', () => {
  let spectator: Spectator<PatientComponent>;
  const createComponent = createRoutingFactory(PatientComponent);

  beforeEach(() => (spectator = createComponent({ props: { patient: FIRST_PATIENT } })));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
