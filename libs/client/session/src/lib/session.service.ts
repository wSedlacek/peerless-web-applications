import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth as firebaseAuth } from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor(public auth: AngularFireAuth) {}
  public readonly user$ = this.auth.user;

  public login(): void {
    this.auth.signInWithPopup(new firebaseAuth.GoogleAuthProvider());
  }

  public logout(): void {
    this.auth.signOut();
  }
}
