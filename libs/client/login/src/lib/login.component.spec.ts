import { byText, createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterTestingModule } from '@angular/router/testing';
import { SessionModule } from '@peerless/client/session';
import { AngularFireTestingModule } from '@peerless/testing/fire';
import { TestingHelpersModule } from '@peerless/testing/helpers';

import { AngularFireAuth } from '@angular/fire/auth';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let spectator: Spectator<LoginComponent>;
  const createComponent = createComponentFactory({
    imports: [
      AngularFireTestingModule.initializeApp('peerless'),
      SessionModule,
      MatButtonModule,
      MatCardModule,
      TestingHelpersModule,
      RouterTestingModule,
    ],
    component: LoginComponent,
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should login with popup', () => {
    const login = spectator.query(byText('Login'));
    expect(login).toBeTruthy();
    if (login !== null) spectator.click(login);

    const auth = spectator.inject(AngularFireAuth);
    expect(auth.signInWithPopup).toHaveBeenCalled();
  });
});
