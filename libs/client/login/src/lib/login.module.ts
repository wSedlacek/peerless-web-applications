import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';

import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule.forChild([{ path: '', component: LoginComponent }]),
  ],
  declarations: [LoginComponent],
})
export class LoginModule {}
