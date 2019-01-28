import { Component, OnInit, ViewContainerRef } from '@angular/core';
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

  message: string;
  datasets: Dataset[];
  selection: Dataset;

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
            this.selection = this.datasets[0];
          }
        }
      );
  }

  showDialog() {
    MessageBoxDialog.open(this.modal, 'Delete user', 'Are you sure that you want to delete this user?', 'Delete user', 'Cancel');
  }
}
