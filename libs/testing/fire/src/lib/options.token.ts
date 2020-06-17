import { InjectionToken } from '@angular/core';

export interface FirebaseTestingOptions {
  loggedIn?: boolean;
}

export const FIREBASE_TESTING_OPTIONS = new InjectionToken<FirebaseTestingOptions>(
  'FIREBASE_TESTING_OPTIONS'
);
