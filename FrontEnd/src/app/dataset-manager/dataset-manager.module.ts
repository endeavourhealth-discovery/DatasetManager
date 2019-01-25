import { NgModule } from '@angular/core';
import { DatasetManagerComponent } from './dataset-manager/dataset-manager.component';
import {DialogsModule, LoggerService} from 'eds-angular4';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DatasetManagerService} from './dataset-manager/dataset-manager.service';

@NgModule({
  imports: [
    CommonModule,
    DialogsModule,
    NgbModule
  ],
  declarations: [DatasetManagerComponent],
  providers: [DatasetManagerService, LoggerService]
})
export class DatasetManagerModule { }
