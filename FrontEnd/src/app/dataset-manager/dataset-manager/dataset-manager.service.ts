import { Injectable } from '@angular/core';
import {URLSearchParams, Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class DatasetManagerService {

  constructor(private http: Http) { }

  getMessage(name: string): Observable<string> {
    const params = new URLSearchParams();
    params.append('name', name);

    return this.http.get('/api/datasetManager/message', {search: params})
      .map((result) => result.text());
  }
}
