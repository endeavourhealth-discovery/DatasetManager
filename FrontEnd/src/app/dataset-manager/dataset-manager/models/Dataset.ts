import {Definition} from "./Definition";

export class Dataset {
  datasetId: number;
  definition: Definition;

  constructor() {
    this.datasetId = 0;
    this.definition = new Definition();
  }
}
