import { Component, OnDestroy, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SessionService } from '@peerless/client/session';

import { PatientEditComponent } from './components';
import { Patient, PatientsQuery, PatientsService } from './state';

@UntilDestroy()
@Component({
  selector: 'peerless-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
})
export class PatientsComponent implements OnInit, OnDestroy {
  constructor(
    private readonly session: SessionService,
    private readonly service: PatientsService,
    private readonly query: PatientsQuery,
    private readonly dialog: MatDialog
  ) {}

  public patients$ = this.query.selectAll();

  @Override()
  public ngOnInit(): void {
    this.service.syncCollectionWhileLoggedIn().pipe(untilDestroyed(this)).subscribe();
  }

  @Override()
  public ngOnDestroy(): void {}

  public async logout(): Promise<void> {
    await this.session.logout({ redirect: 'login' });
  }

  public add(): void {
    this.dialog
      .open(PatientEditComponent)
      .afterClosed()
      .subscribe(async (newPatient?: Patient) => {
        if (newPatient) await this.service.add(newPatient);
      });
  }

  public edit(patient: Patient): void {
    this.dialog
      .open(PatientEditComponent, { width: '300px', data: patient })
      .afterClosed()
      .subscribe(async (updatedPatient?: Patient) => {
        if (updatedPatient) await this.service.update(patient.id, updatedPatient);
      });
  }

  public async remove(id: string): Promise<void> {
    await this.service.remove(id);
  }

  public trackByID(index: number, patient: Patient): string {
    return patient.id ?? index;
  }
}
