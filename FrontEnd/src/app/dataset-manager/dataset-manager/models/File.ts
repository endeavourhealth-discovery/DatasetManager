import {Field} from "./Field";
import {CodeSet} from "./CodeSet";

export class File {
  type: string;
  fields: Field[];
  codeSets: CodeSet[];
}
