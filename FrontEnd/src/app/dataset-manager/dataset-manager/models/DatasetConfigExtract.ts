import {DatasetFields} from "./DatasetFields";
import {DatasetCodeSet} from "./DatasetCodeSet";
import {ConfigExtractType} from "./ConfigExtractType";

export class DatasetConfigExtract {
  type: ConfigExtractType;
  fields: Array<DatasetFields>;
  codeSets: Array<DatasetCodeSet>;

  constructor() {
    this.type = ConfigExtractType.MEDICATION;
    this.fields = new Array<DatasetFields>();
    this.codeSets = new Array<DatasetCodeSet>();
  }
}
