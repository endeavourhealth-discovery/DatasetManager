import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {DatasetManagerComponent} from './dataset-manager/dataset-manager.component';
import {DialogsModule, LoggerService} from 'eds-angular4';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DatasetManagerService} from './dataset-manager/dataset-manager.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DialogsModule,
    NgbModule,
  ],
  declarations: [DatasetManagerComponent],
  providers: [DatasetManagerService, LoggerService]
})
export class DatasetManagerModule { }
