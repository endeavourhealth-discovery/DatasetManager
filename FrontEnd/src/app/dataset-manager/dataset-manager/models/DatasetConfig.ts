import {DatasetConfigExtract} from './DatasetConfigExtract';

export class DatasetConfig {
  name: string;
  id: number;
  extract: Array<DatasetConfigExtract>;

  constructor() {
    this.name = '';
    this.id = 0;
    this.extract = new Array<DatasetConfigExtract>();
  }
}
