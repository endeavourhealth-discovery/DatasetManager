import { Injectable } from '@angular/core';
import {URLSearchParams, Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Dataset} from "./models/Dataset";

@Injectable()
export class DatasetManagerService {

  constructor(private http: Http) { }

  getList(): Observable<Dataset[]> {
    return this.http.get('/api/datasetManager/list')
      .map((response) => response.json());
  }

  deleteDataset(id: any): Observable<any> {
    const params = new URLSearchParams();
    params.set('id', id);
    return this.http.delete('api/datasetManager', { search : params })
      .map((response) => response.text());
  }

}
