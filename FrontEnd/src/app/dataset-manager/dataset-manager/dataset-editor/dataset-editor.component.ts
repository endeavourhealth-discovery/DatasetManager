import {Component, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastsManager} from 'ng2-toastr';
import {LoggerService, MessageBoxDialog} from 'eds-angular4';
import {ModuleStateService} from 'eds-angular4/dist/common';
import {DatasetManagerService} from '../dataset-manager.service';
import {Dataset} from '../models/Dataset';
import {DatasetConfig} from '../models/DatasetConfig';
import {DatasetConfigExtract} from "../models/DatasetConfigExtract";
import {CodeSetExtractType} from "../models/enums/CodeSetExtractType";
import {PatientFileFields} from "../models/enums/PatientFileFields";
import {ObservationFileFields} from "../models/enums/ObservationFileFields";
import {AllergyFileFields} from "../models/enums/AllergyFileFields";
import {ImmunisationFileFields} from "../models/enums/ImmunisationFileFields";
import {MedicationFileFields} from "../models/enums/MedicationFileFields";

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
  codeSetExtractTypes;
  patientFileFieldHeaders;
  observationFileFieldHeaders;
  allergyFileFieldHeaders;
  immunisationFileFieldHeaders;
  medicationFileFieldHeaders;

  @ViewChild('datasetId') datasetIdBox;
  @ViewChild('definition.name') datasetNameBox;
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
    this.codeSetExtractTypes = Object.keys(CodeSetExtractType)
      .map(cset => CodeSetExtractType[cset as any]);
    this.patientFileFieldHeaders = Object.keys(PatientFileFields)
      .map(pffh => PatientFileFields[pffh as any]);
    this.observationFileFieldHeaders = Object.keys(ObservationFileFields)
      .map(offh => ObservationFileFields[offh as any]);
    this.allergyFileFieldHeaders = Object.keys(AllergyFileFields)
      .map(affh => AllergyFileFields[affh as any]);
    this.immunisationFileFieldHeaders = Object.keys(ImmunisationFileFields)
      .map(iffh => ImmunisationFileFields[iffh as any]);
    this.medicationFileFieldHeaders = Object.keys(MedicationFileFields)
      .map(mffh => MedicationFileFields[mffh as any]);

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
    if (this.validateFormInput()) {
      this.datasetManagerService.saveDataset(this.selection, this.editMode)
        .subscribe(
          (response) => {
            this.selection = response;
            this.datasetManagerService.setSelectedDataset(this.selection);
            if (close) {
              this.close(!close);
            } else {
              this.log.success('Dataset saved successfully', null, 'Save dataset confirmation') // this.dialogTitle
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

  validateFormInput() {
    if (this.selection.definition.name.trim() === '') {
      this.log.warning('Dataset Name must not be blank');
      this.datasetNameBox.nativeElement.focus();
      return false;
    }
    return true;
  }

  deleteFile(datasetConfigExtract: DatasetConfigExtract) {
    MessageBoxDialog.open(this.modal, 'Delete dataset file check',
      'Are you sure that you want to delete the dataset <strong>' + datasetConfigExtract.type.toString().toUpperCase()
      + '</strong> file?',
      'Delete dataset file', 'Cancel')
      .result.then(
      () => this.doFileDelete(datasetConfigExtract),
      () => this.log.info('Delete dataset file cancelled')
    );
  }

  doFileDelete(datasetConfigExtract: DatasetConfigExtract){
    const index = this.selection.definition.extract.indexOf(datasetConfigExtract);
    this.selection.definition.extract.splice(index, 1);
  }

  addFile() {
    // to be completed and tested
    let datasetConfigExtract = new DatasetConfigExtract();
    this.selection.definition.extract.push(datasetConfigExtract);
  }

  /*removeCodeSet(codeSetCode: CodeSetCodes) {
    const index = this.selection.codeSetCodes.indexOf(codeSetCode);
    this.selection.codeSetCodes.splice(index, 1);
  }*/
}
