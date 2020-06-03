import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { AngularFireAuthModule } from '@angular/fire/auth';

@NgModule({
  imports: [CommonModule, AngularFireAuthModule],
})
export class SessionModule {}
