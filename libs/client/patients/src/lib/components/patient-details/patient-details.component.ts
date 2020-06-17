import { Component, OnInit } from '@angular/core';

import { PatientsQuery } from '../../state';

@Component({
  selector: 'peerless-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss'],
})
export class PatientDetailsComponent implements OnInit {
  constructor(private readonly query: PatientsQuery) {}

  public patient$ = this.query.selectActive();

  @Override()
  public ngOnInit(): void {}
}
