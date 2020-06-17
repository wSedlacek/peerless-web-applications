import { Inject, Injectable } from '@angular/core';

import { User } from 'firebase';
import { MockApp } from 'mockbase';
import { BehaviorSubject, of } from 'rxjs';

import { EXAMPLE_USER } from '../example/user.example';
import { FIREBASE_TESTING_OPTIONS, FirebaseTestingOptions } from '../options.token';

type UserCredential = firebase.auth.UserCredential;

@Injectable({ providedIn: 'root' })
export class AngularFireAuthMock {
  constructor(
    private readonly app: MockApp,
    @Inject(FIREBASE_TESTING_OPTIONS) options: FirebaseTestingOptions
  ) {
    if (options.loggedIn) this.signInWithPopup();
    app.auth().onAuthStateChanged((user) => this.internalUser.next(user));
  }

  private readonly internalUser = new BehaviorSubject<User | null>(null);
  public readonly user = this.internalUser.asObservable();

  public get currentUser(): Promise<User | null> {
    return of(this.app.auth().currentUser).toPromise();
  }

  public async signOut(): Promise<void> {
    await this.app.auth().signOut();
  }

  public async signInAnonymously(): Promise<UserCredential> {
    return this.app.auth().signInAnonymously();
  }

  public async signInWithPopup(): Promise<UserCredential> {
    this.app
      .auth()
      .mockSocialSignIn({ providerId: 'mock' })
      .respondWithUser(EXAMPLE_USER.displayName, EXAMPLE_USER.email);

    return this.app.auth().signInWithPopup({ providerId: 'mock' });
  }
}
