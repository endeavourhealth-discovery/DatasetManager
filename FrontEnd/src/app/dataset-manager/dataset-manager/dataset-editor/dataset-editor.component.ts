import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastsManager} from 'ng2-toastr';
import {LoggerService, MessageBoxDialog} from 'eds-angular4';
import {ModuleStateService} from 'eds-angular4/dist/common';
import {DatasetManagerService} from '../dataset-manager.service';
import {Dataset} from '../models/Dataset';
import {DatasetConfig} from '../models/DatasetConfig';

@Component({
  selector: 'app-dataset-editor',
  templateUrl: './dataset-editor.component.html',
  styleUrls: ['./dataset-editor.component.css']
})
export class DatasetEditorComponent implements OnInit {

  @Input() selection: Dataset;
  @Input() editMode: boolean;
  @Input() existing: boolean;
  @Input() selfEdit: boolean;
  dialogTitle: string;

  // TODO: Need to rework the below for Arrays etc.

  @ViewChild('datasetId') datasetIdBox;

  @ViewChild('definition.name') nameBox;
  @ViewChild('definition.id') idBox;
  @ViewChild('definition.extract.type') extractTypeBox;
  @ViewChild('definition.extract.fields.header') extractFieldsHeaderBox;
  @ViewChild('definition.extract.fields.index') extractFieldsIndexBox;
  @ViewChild('definition.extract.codeSets.codeSetId') extractCodeSetsCodeSetIdBox;
  @ViewChild('definition.extract.codeSets.extractType') extractCodeSetsExtractTypeBox;

  constructor(private log: LoggerService,
              private modal: NgbModal,
              private router: Router,
              private location: Location,
              private state: ModuleStateService,
              protected datasetManagerService: DatasetManagerService,
              public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit(): void {

    const screen = this.state.getState('datasetEditor');

    if (screen == null) {
      this.selection = {} as Dataset;
      this.router.navigate(['dataset']);
      return;
    }

    this.selection = Object.assign([], screen.extract);
    this.editMode = screen.editMode;
    this.existing = screen.existing;
    this.selfEdit = screen.selfEdit;

    if (!this.editMode) {
      this.dialogTitle = 'Add Dataset';

      const definition = new DatasetConfig();

      this.selection = {
        datasetId: 0,
        definition: definition,
      } as Dataset;

    } else {
      this.dialogTitle = 'Edit Dataset';

      this.selection = {
        datasetId: this.selection.datasetId,
        definition: this.selection.definition,
      } as Dataset;

    }
  }

  isEditMode() {
    return this.editMode;
  }

  save(close: boolean) {
    const const1 = true;
    if (const1 == true) { // this.validateFormInput() // TODO: this validation - will be short as most of it
                                                      // will be done already by the use of enums and dropdowns!
      this.datasetManagerService.saveDataset(this.selection, this.editMode)
        .subscribe(
          (response) => {
            this.selection = response;
            this.datasetManagerService.setSelectedDataset(this.selection);
            if (close) {
              this.close(!close);
            } else {
              this.log.success('Dataset saved successfully', null, 'Save dataset confirmation' ) // this.dialogTitle
            }
          },
          (error) => this.log.error('The dataset could not be saved', error, 'Save dataset error')
        );
    }
  }

  close(withConfirm: boolean) {
    if (withConfirm) {
      MessageBoxDialog.open(this.modal, this.dialogTitle, 'Any unsaved changes will be lost. ' +
        'Do you want to close without saving?', 'Close without saving', 'Continue editing')
        .result.then(
        (result) => this.location.back(),
        (reason) => {
        }
      );
    } else {
      this.location.back();
    }
  }
}
