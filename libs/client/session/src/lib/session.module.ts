import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { SessionService } from './session.service';

@NgModule({
  imports: [CommonModule, AngularFireAuthModule],
  providers: [SessionService],
})
export class SessionModule {}
