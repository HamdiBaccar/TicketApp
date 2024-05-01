import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuperUserPage } from './super-user.page';

const routes: Routes = [
  {
    path: '',
    component: SuperUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuperUserPageRoutingModule {}
