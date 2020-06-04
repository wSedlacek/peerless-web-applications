import { Component, OnInit } from '@angular/core';
import { SessionService } from '@peerless/client/session';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(public session: SessionService) {}
  public user$ = this.session.user$;

  @Override()
  public ngOnInit(): void {}

  public async login(): Promise<void> {
    await this.session.login();
  }

  public async logout(): Promise<void> {
    await this.session.logout();
  }
}
