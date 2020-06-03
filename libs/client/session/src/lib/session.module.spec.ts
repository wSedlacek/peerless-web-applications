import { async, TestBed } from '@angular/core/testing';
import { SessionModule } from './session.module';

describe('SessionModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SessionModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SessionModule).toBeDefined();
  });
});
