import { Injectable } from '@angular/core';

import { DocumentData } from '@angular/fire/firestore';
import { MockApp } from 'mockbase';
import { User } from 'mockbase/auth/user';
import { MockDocumentReference, MockQuerySnapshot } from 'mockbase/firestore';

import { AngularFireAuthMock } from './mocks/fire-auth.mock';

@Injectable({ providedIn: 'root' })
export class AngularFireTestingHarness {
  constructor(private readonly app: MockApp, private readonly auth: AngularFireAuthMock) {}
  public readonly firestore = this.app.firestore();

  public get user(): User | null {
    return this.app.auth().currentUser;
  }

  public get uid(): string | undefined {
    return this.app.auth().currentUser?.uid;
  }

  public async signIn(): Promise<User | null> {
    await this.auth.signInWithPopup();

    return this.user;
  }

  public logout(): void {
    this.auth.signOut();
  }

  public async resetCollection(path: string, seed: DocumentData[]): Promise<void> {
    await this.clearCollection(path);
    await this.seedCollection(path, seed);
  }

  public async seedCollection(
    path: string,
    seed: DocumentData[]
  ): Promise<MockDocumentReference[]> {
    const batch = this.firestore.batch();

    const savingPromises = seed.map(async (doc) => {
      const { id = this.firestore.nextId(), ...data } = doc;
      const ref = this.firestore.doc(`${path}/${id}`);
      batch.set(ref, data);

      return ref;
    });

    await batch.commit();

    return Promise.all(savingPromises);
  }

  public async clearCollection(path: string): Promise<void> {
    const batch = this.firestore.batch();
    const collection = await this.firestore.collection(path).get();
    const deletingPromises = collection.docs.map(async ({ ref }) => batch.delete(ref));

    await batch.commit();
    await Promise.all(deletingPromises);
  }

  public async storeData(path: string, data: DocumentData): Promise<void> {
    await this.app.firestore().doc(path).set(data);
  }

  public async removeData(path: string): Promise<void> {
    await this.app.firestore().doc(path).delete();
  }

  public async getCollection(path: string): Promise<MockQuerySnapshot> {
    return this.app.firestore().collection(path).get();
  }
}
