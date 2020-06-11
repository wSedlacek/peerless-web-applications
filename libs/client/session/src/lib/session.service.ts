import { Injectable, NgZone } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { auth as firebaseAuth, User } from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor(
    public auth: AngularFireAuth,
    private readonly router: Router,
    private readonly zone: NgZone
  ) {}

  public readonly user$ = this.auth.user;

  public get user(): Promise<User | null> {
    return this.auth.currentUser;
  }

  public async login(config?: {
    redirect?: string;
    callback?(user: User | null): void;
  }): Promise<void> {
    const { callback, redirect = '/' } = config ?? {};
    const cred = await this.auth.signInWithPopup(new firebaseAuth.GoogleAuthProvider());
    if (callback) callback(cred.user);
    this.zone.run(() => this.router.navigateByUrl(redirect));
  }

  public async logout(config?: { redirect?: string; callback?(): void }): Promise<void> {
    const { callback, redirect = '/' } = config ?? {};
    await this.auth.signOut();
    if (callback) callback();
    this.zone.run(() => this.router.navigateByUrl(redirect));
  }
}
