import {DatasetConfig} from "./DatasetConfig";

export class Dataset {
  datasetId: number;
  definition: DatasetConfig;

  constructor() {
    this.datasetId = 0;
    this.definition = new DatasetConfig();
  }
}
