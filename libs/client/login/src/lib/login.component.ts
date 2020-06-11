import { Component, OnInit } from '@angular/core';
import { SessionService } from '@peerless/client/session';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private readonly session: SessionService) {}
  public user$ = this.session.user$;

  @Override()
  public ngOnInit(): void {}

  public async login(): Promise<void> {
    try {
      await this.session.login();
    } catch {
      // TODO: Replace with animation or something
      console.log('User did not login');
    }
  }
}
