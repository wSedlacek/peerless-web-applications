import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { PatientEditComponent } from './patient-edit.component';

describe('PatientEditComponent', () => {
  let spectator: Spectator<PatientEditComponent>;
  const createComponent = createComponentFactory({
    component: PatientEditComponent,
    providers: [
      { provide: MatDialogRef, useValue: {} },
      { provide: MAT_DIALOG_DATA, useValue: {} },
    ],
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
