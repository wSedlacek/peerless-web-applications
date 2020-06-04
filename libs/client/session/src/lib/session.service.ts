import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth as firebaseAuth, User } from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor(public auth: AngularFireAuth) {}
  public readonly user$ = this.auth.user;

  public get user(): Promise<User | null> {
    return this.auth.currentUser;
  }

  public async login(): Promise<void> {
    await this.auth.signInWithPopup(new firebaseAuth.GoogleAuthProvider());
  }

  public async logout(): Promise<void> {
    await this.auth.signOut();
  }
}
