import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';

import { AngularFireTestingModule } from '@peerless/testing/fire';

import { SessionService } from './session.service';

describe('SessionService', () => {
  let spectator: SpectatorService<SessionService>;
  const createService = createServiceFactory({
    imports: [AngularFireTestingModule.initializeApp('peerless')],
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
});
