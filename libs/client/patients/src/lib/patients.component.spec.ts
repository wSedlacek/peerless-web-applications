import { byText, createRoutingFactory, mockProvider, Spectator } from '@ngneat/spectator/jest';

import { fakeAsync } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { AngularFireTestingHarness } from '@peerless/testing/fire';
import { of } from 'rxjs';

import { PatientComponent } from './components';
import { FIRST_PATIENT, NEW_PATIENT, PATIENTS_SEED } from './state';

import { PatientsComponent } from './patients.component';

describe('PatientsComponent', () => {
  let spectator: Spectator<PatientsComponent>;
  let firebase: AngularFireTestingHarness;
  const createComponent = createRoutingFactory({
    component: PatientsComponent,
    providers: [
      mockProvider(MatDialog, {
        open: () => ({
          afterClosed: () => of(NEW_PATIENT),
        }),
      }),
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
    firebase = spectator.inject(AngularFireTestingHarness);
  });

  beforeEach(async () => {
    await firebase.resetCollection(`users/${firebase.uid}/patients`, PATIENTS_SEED);
    spectator.detectChanges();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should load patients', () => {
    const patient = spectator.query(byText(FIRST_PATIENT.name, { exact: false }));
    expect(patient).toBeTruthy();
  });

  it('should add patients', async () => {
    const addButton = spectator.query(byText('add'));
    if (addButton === null) throw new Error('Could not find add button');

    spectator.click(addButton);
    await spectator.fixture.whenStable();

    const patient = spectator.query(byText(NEW_PATIENT.name, { exact: false }));
    expect(patient).toBeTruthy();
  });

  it('should edit patients', fakeAsync(() => {
    let patient = spectator.query(PatientComponent);
    if (patient === null) throw new Error('Could not find patient');

    patient.edit.emit();
    spectator.tick();

    patient = spectator.query(PatientComponent);
    expect(patient?.patient?.name).toBe(NEW_PATIENT.name);
  }));

  it('should remove patients', async () => {
    let patients = spectator.queryAll(PatientComponent);
    const previousTotal = patients.length;
    const patientToRemove = patients[0];

    patientToRemove.remove.emit();
    await spectator.fixture.whenStable();

    patients = spectator.queryAll(PatientComponent);
    expect(previousTotal - patients.length).toBe(1);
  });
});
