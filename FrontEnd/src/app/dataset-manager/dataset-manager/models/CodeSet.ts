import {CodeSetExtractType} from "./CodeSetExtractType";

export class CodeSet {
  codeSetId: number;
  extractType: CodeSetExtractType;

  constructor() {
    this.codeSetId = 0;
    this.extractType = CodeSetExtractType.ALL;
  }
}
