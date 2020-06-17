import { ModuleWithProviders, NgModule } from '@angular/core';

import { FirebaseApp } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MockApp } from 'mockbase';

import { AngularFireTestingHarness } from './fire-testing.harness';
import { AngularFireAuthMock } from './mocks/fire-auth.mock';
import { AngularFirestoreMock } from './mocks/firestore.mock';
import { FIREBASE_TESTING_OPTIONS, FirebaseTestingOptions } from './options.token';

@NgModule()
export class AngularFireTestingModule {
  public static initializeApp(
    name: string,
    options: FirebaseTestingOptions = {}
  ): ModuleWithProviders<AngularFireTestingModule> {
    return {
      ngModule: AngularFireTestingModule,
      providers: [
        AngularFireAuthMock,
        AngularFirestoreMock,
        AngularFireTestingHarness,
        { provide: FIREBASE_TESTING_OPTIONS, useValue: options },
        { provide: FirebaseApp, useValue: new MockApp(name) },
        { provide: MockApp, useExisting: FirebaseApp },
        { provide: AngularFireAuth, useExisting: AngularFireAuthMock },
        { provide: AngularFirestore, useExisting: AngularFirestoreMock },
      ],
    };
  }
}
