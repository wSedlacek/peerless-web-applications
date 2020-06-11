import { Component, OnInit } from '@angular/core';

import { SessionService } from '@peerless/client/session';

@Component({
  selector: 'peerless-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
})
export class PatientsComponent implements OnInit {
  constructor(private readonly session: SessionService) {}

  @Override()
  public ngOnInit(): void {}

  public logout(): void {
    this.session.logout();
  }
}
