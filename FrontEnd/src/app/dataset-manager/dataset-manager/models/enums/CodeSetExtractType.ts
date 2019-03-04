export enum CodeSetExtractType {
  ALL = "all",
  EARLIEST = "earliest",
  LATEST = "latest",
  EARLIEST_EACH = "earliest_each",
  LATEST_EACH = "latest_each",
}

export namespace CodeSetExtractType {

  export function values() {
    return Object.keys(CodeSetExtractType).filter(
      (type) => isNaN(<any>type) && type !== 'values'
    );
  }
}
