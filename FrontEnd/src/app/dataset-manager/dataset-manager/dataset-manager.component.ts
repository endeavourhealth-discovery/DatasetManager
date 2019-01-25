import { Component, OnInit } from '@angular/core';
import {MessageBoxDialog} from 'eds-angular4';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DatasetManagerService} from './dataset-manager.service';

@Component({
  selector: 'app-record-viewer',
  templateUrl: './dataset-manager.component.html',
  styleUrls: ['./dataset-manager.component.css']
})
export class DatasetManagerComponent implements OnInit {

  tableData: any[] = [
    {id: 1, name: 'John Smith', description: 'Senior consultant'},
    {id: 2, name: 'Jane Doe', description: 'General practitioner'},
    {id: 3, name: 'Dave Jones', description: 'Hospital porter'},
    {id: 4, name: 'Doris Jackson', description: 'Surgery receptionist'}
  ];

  selection: any = this.tableData[2];
  message: string;

  constructor(private modal: NgbModal,
              private service: DatasetManagerService) { }

  ngOnInit() {
    this.service.getMessage('Fred')
      .subscribe(
        (result) => this.message = result,
        (error) => console.error(error)
      )
  }

  showDialog() {
    MessageBoxDialog.open(this.modal, 'Delete user', 'Are you sure that you want to delete this user?', 'Delete user', 'Cancel');
  }
}
