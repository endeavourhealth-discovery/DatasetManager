import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {LoggerService, MessageBoxDialog} from 'eds-angular4';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DatasetManagerService} from './dataset-manager.service';
import {ToastsManager} from 'ng2-toastr';
import {Dataset} from "./models/Dataset";

@Component({
  selector: 'app-record-viewer',
  templateUrl: './dataset-manager.component.html',
  styleUrls: ['./dataset-manager.component.css']
})
export class DatasetManagerComponent implements OnInit {

  datasets: Dataset[];
  filteredDatasets: Dataset[];
  selection: Dataset;
  searchTerm: string;

  constructor(private modal: NgbModal,
              private log: LoggerService,
              private service: DatasetManagerService,
              public toastr: ToastsManager, vcr: ViewContainerRef){
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.service.getList()
      .subscribe(
        result => {
          this.datasets = result;
          let val: any;
          for (let i = 0; i < this.datasets.length; i++) {
            val = this.datasets[i].definition;
            this.datasets[i].definition = JSON.parse(val);
            this.filteredDatasets = this.datasets;
            this.selection = this.filteredDatasets[0];
            console.log(this.selection);
          }
        },
      );
  }

  delete(item: Dataset) {
    MessageBoxDialog.open(this.modal, 'Delete dataset check', 'Are you sure that you want to delete the dataset named <b>' + item.definition.name + '</b>?', 'Delete dataset', 'Cancel')
      .result.then(
      () => this.doDelete(item),
      () => this.log.info('Delete dataset cancelled')
    );
  }

  doDelete(item: Dataset) {
    this.service.deleteDataset(item.datasetId)
      .subscribe(
        () => {
          const index = this.datasets.indexOf(item);
          this.datasets.splice(index, 1);
          this.log.success('Dataset deleted successfully', item, 'Delete dataset confirmation');
        },
        (error) => this.log.error('The dataset could not be deleted', error, 'Delete dataset error')
      );
  }

  searchDatasets() {
    this.filteredDatasets = this.datasets;
    this.filteredDatasets = this.filteredDatasets.filter(
      dataset => dataset.definition.name.toUpperCase().includes(this.searchTerm.toUpperCase())
    );
  }

  clearSearch() {
    this.searchTerm = '';
    this.filteredDatasets = this.datasets;
  }

}
