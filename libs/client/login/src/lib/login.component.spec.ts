import { byText, createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { SessionModule } from '@peerless/client/session';
import { AngularFireTestingModule } from '@peerless/testing/fire';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let spectator: Spectator<LoginComponent>;
  const createComponent = createComponentFactory({
    imports: [
      AngularFireTestingModule.initializeApp('peerless'),
      SessionModule,
      MatButtonModule,
      MatCardModule,
    ],
    component: LoginComponent,
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should login', () => {
    const login = spectator.query(byText('Login'));
    expect(login).toBeTruthy();
    if (login !== null) spectator.click(login);
  });
});
