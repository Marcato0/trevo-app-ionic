import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditCallPageRoutingModule } from './edit-call-routing.module';

import { EditCallPage } from './edit-call.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditCallPageRoutingModule
  ],
  declarations: [EditCallPage]
})
export class EditCallPageModule {}
