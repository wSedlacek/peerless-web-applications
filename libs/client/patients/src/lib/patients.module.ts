import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';

import { PatientsComponent } from './patients/patients.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule.forChild([{ path: '', component: PatientsComponent }]),
  ],
  declarations: [PatientsComponent],
})
export class PatientsModule {}
