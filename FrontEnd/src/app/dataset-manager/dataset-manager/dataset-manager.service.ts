import {Injectable} from '@angular/core';
import {URLSearchParams, Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Dataset} from "./models/Dataset";

@Injectable()
export class DatasetManagerService {

  dataset: Dataset;

  constructor(private http: Http) { }

  getList(): Observable<Dataset[]> {
    return this.http.get('/api/datasetManager/list')
      .map((response) => response.json());
  }

  getSelectedDataset(): Dataset {
    return this.dataset;
  }

  setSelectedDataset(dataset: Dataset) {
    this.dataset = dataset;
  }

  deleteDataset(id: any): Observable<any> {
    const params = new URLSearchParams();
    params.set('id', id);
    return this.http.delete('api/datasetManager', { search : params })
      .map((response) => response.text());
  }

  saveDataset(dataset: Dataset, editMode: boolean): Observable<Dataset> {
    this.setSelectedDataset(dataset);
    const params = new URLSearchParams();
    params.set('editMode', editMode ? '1' : '0');
    return this.http.post('api/datasetManager/dataset/save', dataset, {search: params})
      .map((response) => response.json());
  }

}
