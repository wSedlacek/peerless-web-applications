import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { MatButtonModule } from '@angular/material/button';
import { RouterTestingModule } from '@angular/router/testing';
import { SessionModule } from '@peerless/client/session';
import { AngularFireTestingModule } from '@peerless/testing/fire';

import { PatientsComponent } from './patients.component';

describe('PatientsComponent', () => {
  let spectator: Spectator<PatientsComponent>;
  const createComponent = createComponentFactory({
    imports: [
      AngularFireTestingModule.initializeApp('peerless'),
      SessionModule,
      MatButtonModule,
      RouterTestingModule,
    ],
    component: PatientsComponent,
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
