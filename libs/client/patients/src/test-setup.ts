import 'jest-preset-angular';
import 'tslint-override/angular-register';

import { defineGlobalsInjections } from '@ngneat/spectator';

import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveComponentModule } from '@ngrx/component';
import { SessionModule } from '@peerless/client/session';
import { AngularFireTestingModule } from '@peerless/testing/fire';

import { PatientComponent, PatientEditComponent } from './lib/components';
import { PatientDetailsGuard } from './lib/guards';
import { PatientsQuery, PatientsService, PatientsStore } from './lib/state';

defineGlobalsInjections({
  imports: [
    AngularFireTestingModule.initializeApp('peerless', { loggedIn: true }),
    SessionModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    ReactiveComponentModule,
  ],
  providers: [PatientsQuery, PatientsService, PatientsStore, PatientDetailsGuard],
  declarations: [PatientEditComponent, PatientComponent],
});
