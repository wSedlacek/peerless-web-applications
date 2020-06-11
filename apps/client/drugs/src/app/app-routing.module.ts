import { NgModule } from '@angular/core';

import {
  AuthPipe,
  AuthPipeGenerator,
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';

const redirectUnauthorizedToLogin: AuthPipeGenerator = () =>
  redirectUnauthorizedTo(['login']) as AuthPipe;
const redirectLoggedInToCore: AuthPipeGenerator = () => redirectLoggedInTo(['']) as AuthPipe;

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('@peerless/client/login').then((m) => m.LoginModule),
    ...canActivate(redirectLoggedInToCore),
  },
  {
    path: '',
    loadChildren: () => import('@peerless/client/patients').then((m) => m.PatientsModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
