import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditCallPage } from './edit-call.page';

const routes: Routes = [
  {
    path: '',
    component: EditCallPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditCallPageRoutingModule {}
