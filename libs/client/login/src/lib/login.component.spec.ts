import { byText, createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { SessionModule } from '@peerless/client/session';
import { AngularFireTestingModule, EXAMPLE_USER } from '@peerless/testing/fire';

import { fakeAsync } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let spectator: Spectator<LoginComponent>;
  const createComponent = createComponentFactory({
    imports: [AngularFireTestingModule.initializeApp('peerless'), SessionModule],
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
    const user = spectator.query(byText(EXAMPLE_USER.displayName, { exact: false }));
    expect(user).toBeTruthy();
  });

  it('should logout', fakeAsync(() => {
    const auth = spectator.inject(AngularFireAuth);
    auth.signInAnonymously();
    spectator.tick();
    const whileLoggedIn = spectator.query(byText('null', { exact: true }));
    expect(whileLoggedIn).toBeFalsy();

    const logout = spectator.query(byText('Logout'));
    expect(logout).toBeTruthy();
    if (logout !== null) spectator.click(logout);
    spectator.tick();
    const afterLogout = spectator.query(byText('null', { exact: true }));
    expect(afterLogout).toBeTruthy();
  }));
});
