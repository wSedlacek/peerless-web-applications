import { ModuleWithProviders, NgModule } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireAuthMock } from './fire-auth.mock';

import { FirebaseApp } from '@angular/fire';
import { MockApp } from 'mockbase';
import { EXAMPLE_USER } from './example-user';

@NgModule({
  providers: [{ provide: AngularFireAuth, useClass: AngularFireAuthMock }],
})
export class AngularFireTestingModule {
  public static initializeApp(name: string): ModuleWithProviders<AngularFireTestingModule> {
    const app = new MockApp(name);
    const test = app.auth().mockSocialSignIn({ providerId: 'mock' });
    test.respondWithUser(EXAMPLE_USER.displayName, EXAMPLE_USER.email);

    return {
      ngModule: AngularFireTestingModule,
      providers: [
        { provide: AngularFireAuth, useClass: AngularFireAuthMock },
        { provide: FirebaseApp, useValue: app },
      ],
    };
  }
}
