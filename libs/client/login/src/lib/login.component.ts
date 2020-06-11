import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { SessionService } from '@peerless/client/session';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private readonly session: SessionService, private readonly route: ActivatedRoute) {}
  public user$ = this.session.user$;

  @Override()
  public ngOnInit(): void {}

  public async login(): Promise<void> {
    try {
      const { redirect } = this.route.snapshot.data;
      await this.session.login({ redirect });
    } catch {
      // TODO: Replace with animation or something
      console.warn('User did not login');
    }
  }
}
