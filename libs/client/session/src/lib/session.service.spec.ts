import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';

import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireTestingModule } from '@peerless/testing/fire';
import { BlankComponent, TestingHelpersModule } from '@peerless/testing/helpers';

import { SessionService } from './session.service';

describe('SessionService', () => {
  let spectator: SpectatorService<SessionService>;
  const createService = createServiceFactory({
    imports: [
      AngularFireTestingModule.initializeApp('peerless'),
      TestingHelpersModule,
      RouterTestingModule.withRoutes([
        {
          path: '',
          component: BlankComponent,
        },
        {
          path: 'redirect',
          component: BlankComponent,
        },
      ]),
    ],
    service: SessionService,
  });

  beforeEach(() => (spectator = createService()));

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });

  it('should login', async () => {
    await spectator.service.login();
    const user = await spectator.service.user;
    expect(user).toBeTruthy();
  });

  it('should logout', async () => {
    await spectator.service.logout();
    const userAfterLogout = await spectator.service.user;
    expect(userAfterLogout).toBeFalsy();
  });

  it('should redirect on login', async () => {
    const router = spectator.inject(Router);
    expect(router.url).toBe('/');

    await spectator.service.login({ redirect: '/redirect' });
    expect(router.url).toBe('/redirect');
  });

  it('should redirect on logout', async () => {
    const router = spectator.inject(Router);
    expect(router.url).toBe('/');

    await spectator.service.logout({ redirect: '/redirect' });
    expect(router.url).toBe('/redirect');
  });

  it('should call callback on login', async () => {
    const callback = jest.fn();
    await spectator.service.login({ callback });
    const user = await spectator.service.user;
    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledWith(user);
  });

  it('should call callback on logout', async () => {
    const callback = jest.fn();
    await spectator.service.logout({ callback });
    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledWith();
  });
});
