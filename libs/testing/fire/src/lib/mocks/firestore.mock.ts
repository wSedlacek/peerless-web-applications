import { Injectable } from '@angular/core';

import { AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MockApp } from 'mockbase';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

type QuerySnapshot = firebase.firestore.QuerySnapshot;

@Injectable({ providedIn: 'root' })
export class AngularFirestoreMock {
  constructor(private readonly app: MockApp) {}
  public firestore = this.app.firestore();

  public createId(): string {
    return this.firestore.nextId();
  }

  public doc(path: string): Partial<AngularFirestoreDocument> {
    const ref = this.firestore.doc(path);

    return {
      ref,
      delete: ref.delete,
      set: ref.set,
      update: ref.update,
    };
  }

  public collection(path: string): Partial<AngularFirestoreCollection> {
    const ref = this.firestore.collection(path);

    const stateChanges = () => {
      const subject = new Subject<QuerySnapshot>();
      ref.onSnapshot({
        next: (data) => subject.next(data),
        error: (err) => subject.error(err),
        complete: () => subject.complete(),
      });

      return subject.pipe(
        map((collection) =>
          collection.docChanges().map((payload) => ({
            payload,
            type: payload.type,
          }))
        )
      );
    };

    return { ref, stateChanges };
  }
}
