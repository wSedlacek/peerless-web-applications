import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { SessionModule } from '@peerless/client/session';

import { environment } from '../environments';

@NgModule({
  imports: [
    CommonModule,
    SessionModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
  ],
})
export class SharedModule {}
