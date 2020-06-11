import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { BlankComponent } from './blank.component';

describe('BlankComponent', () => {
  let spectator: Spectator<BlankComponent>;
  const createComponent = createComponentFactory(BlankComponent);

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
