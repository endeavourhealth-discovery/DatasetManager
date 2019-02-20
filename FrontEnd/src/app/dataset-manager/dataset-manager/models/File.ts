import {Field} from "./Field";
import {CodeSet} from "./CodeSet";

export class File {
  type: string;
  fields: Array<Field>;
  codeSets: Array<CodeSet>;

  constructor() {
    this.type = '';
    this.fields = new Array<Field>();
    this.codeSets = new Array<CodeSet>();
  }
}
