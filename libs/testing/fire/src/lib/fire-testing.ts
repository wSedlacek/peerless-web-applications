import { ModuleWithProviders, NgModule } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireAuthMock } from './fire-auth.mock';

import { FirebaseApp } from '@angular/fire';
import { MockApp } from 'mockbase';

@NgModule({
  providers: [{ provide: AngularFireAuth, useClass: AngularFireAuthMock }],
})
export class AngularFireTestingModule {
  public static initializeApp(name: string): ModuleWithProviders<AngularFireTestingModule> {
    return {
      ngModule: AngularFireTestingModule,
      providers: [
        { provide: AngularFireAuth, useClass: AngularFireAuthMock },
        { provide: FirebaseApp, useValue: new MockApp(name) },
      ],
    };
  }
}
