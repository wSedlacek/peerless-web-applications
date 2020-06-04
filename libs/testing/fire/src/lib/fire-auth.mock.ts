import { Injectable } from '@angular/core';

import { FirebaseApp } from '@angular/fire';
import { BehaviorSubject, of } from 'rxjs';

import { User } from 'firebase';

@Injectable({ providedIn: 'root' })
export class AngularFireAuthMock {
  constructor(private readonly app: FirebaseApp) {}

  private readonly internalUser = new BehaviorSubject<User | null>(null);

  public readonly user = this.internalUser.asObservable();
  public get currentUser(): Promise<User | null> {
    return of(this.app.auth().currentUser).toPromise();
  }

  public readonly signInWithPopup = jest.fn().mockImplementation(async () => {
    const creds = await this.app.auth().signInWithPopup({ providerId: 'mock' });
    this.internalUser.next(creds.user);

    return creds;
  });

  public readonly signOut = jest.fn().mockImplementation(async () => {
    await this.app.auth().signOut();
    this.internalUser.next(null);
  });

  public readonly signInAnonymously = jest.fn().mockImplementation(async () => {
    const creds = await this.app.auth().signInAnonymously();
    this.internalUser.next(creds.user);

    return creds;
  });
}
