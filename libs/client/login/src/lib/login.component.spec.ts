import { byText, createRoutingFactory, Spectator } from '@ngneat/spectator/jest';

import { AngularFireAuth } from '@angular/fire/auth';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let spectator: Spectator<LoginComponent>;
  const createComponent = createRoutingFactory(LoginComponent);

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should login with popup', () => {
    const auth = spectator.inject(AngularFireAuth);
    jest.spyOn(auth, 'signInWithPopup');

    const login = spectator.query(byText('Login'));
    if (login === null) throw new Error('Could not find login button');
    spectator.click(login);

    expect(auth.signInWithPopup).toHaveBeenCalled();
  });
});
