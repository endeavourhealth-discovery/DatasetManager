import {File} from './File';

export class Definition {
  name: string;
  id: number;
  extract: Array<File>;

  constructor() {
    this.name = '';
    this.id = 0;
    this.extract = new Array<File>();
  }
}
