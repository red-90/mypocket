import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListOperationPage } from './list-operation';

@NgModule({
  declarations: [
    ListOperationPage,
  ],
  imports: [
    IonicPageModule.forChild(ListOperationPage),
  ],
})
export class ListOperationPageModule {}
