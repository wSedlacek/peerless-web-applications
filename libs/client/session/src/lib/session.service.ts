import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { auth as firebaseAuth, User } from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor(
    public auth: AngularFireAuth,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}
  public readonly user$ = this.auth.user;

  public get user(): Promise<User | null> {
    return this.auth.currentUser;
  }

  public async login(callback?: (user: firebaseAuth.UserCredential) => void): Promise<void> {
    const user = await this.auth.signInWithPopup(new firebaseAuth.GoogleAuthProvider());
    if (callback) callback(user);
    this.router.navigateByUrl(this.route.snapshot.data.redirect ?? '');
  }

  public async logout(callback?: () => void): Promise<void> {
    await this.auth.signOut();
    if (callback) callback();
    this.router.navigateByUrl('login');
  }
}
