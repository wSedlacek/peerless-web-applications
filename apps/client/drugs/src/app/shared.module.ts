import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { SessionModule } from '@peerless/client/session';
import { environment } from '../environments';

@NgModule({
  imports: [CommonModule, SessionModule, AngularFireModule.initializeApp(environment.firebase)],
})
export class SharedModule {}
