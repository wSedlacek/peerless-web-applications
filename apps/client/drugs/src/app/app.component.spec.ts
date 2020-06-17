import { createRoutingFactory, Spectator } from '@ngneat/spectator/jest';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;
  const createComponent = createRoutingFactory(AppComponent);

  beforeEach(() => (spectator = createComponent()));

  it('should create the app', () => {
    expect(spectator).toBeTruthy();
  });
});
