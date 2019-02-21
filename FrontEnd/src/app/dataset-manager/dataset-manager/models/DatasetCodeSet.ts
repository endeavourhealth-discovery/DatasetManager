import {CodeSetExtractType} from "./CodeSetExtractType";

export class DatasetCodeSet {
  codeSetId: number;
  extractType: CodeSetExtractType;

  constructor() {
    this.codeSetId = 0;
    this.extractType = CodeSetExtractType.ALL;
  }
}
