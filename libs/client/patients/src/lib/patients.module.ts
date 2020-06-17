import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { ReactiveComponentModule } from '@ngrx/component';

import { PatientComponent, PatientDetailsComponent, PatientEditComponent } from './components';
import { PatientDetailsGuard } from './guards';
import { PatientsQuery, PatientsService, PatientsStore } from './state';

import { PatientsComponent } from './patients.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule.forChild([
      { path: '', component: PatientsComponent },
      {
        path: 'patient/:id',
        component: PatientDetailsComponent,
        canActivate: [PatientDetailsGuard],
        canDeactivate: [PatientDetailsGuard],
      },
    ]),
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    ReactiveComponentModule,
  ],
  providers: [PatientsQuery, PatientsService, PatientsStore, PatientDetailsGuard],
  declarations: [
    PatientsComponent,
    PatientComponent,
    PatientEditComponent,
    PatientDetailsComponent,
  ],
})
export class PatientsModule {}
