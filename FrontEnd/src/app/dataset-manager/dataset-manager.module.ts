import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import {ControlsModule} from "eds-angular4/dist/controls";
import {ModuleStateService} from "eds-angular4/dist/common";
import {DialogsModule, LoggerService} from 'eds-angular4';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DatasetManagerComponent} from './dataset-manager/dataset-manager.component';
import {DatasetManagerService} from './dataset-manager/dataset-manager.service';
import {DatasetEditorComponent} from './dataset-manager/dataset-editor/dataset-editor.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DialogsModule,
    NgbModule,
    ToastModule.forRoot(),
    ControlsModule
  ],
  declarations: [DatasetManagerComponent, DatasetEditorComponent],
  entryComponents: [DatasetEditorComponent],
  providers: [DatasetManagerService, LoggerService, ModuleStateService]
})
export class DatasetManagerModule { }
