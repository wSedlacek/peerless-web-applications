import 'jest-preset-angular';
import 'tslint-override/angular-register';

import { defineGlobalsInjections } from '@ngneat/spectator';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { SessionModule } from '@peerless/client/session';
import { AngularFireTestingModule } from '@peerless/testing/fire';
import { TestingHelpersModule } from '@peerless/testing/helpers';

defineGlobalsInjections({
  imports: [
    AngularFireTestingModule.initializeApp('peerless'),
    SessionModule,
    MatButtonModule,
    MatCardModule,
    TestingHelpersModule,
  ],
});
