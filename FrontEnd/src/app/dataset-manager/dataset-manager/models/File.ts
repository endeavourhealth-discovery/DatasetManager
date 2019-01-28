import {Fields} from "./Fields";
import {Codesets} from "./Codesets";

export class File {
  type: string;
  fields: Array<Fields>;
  codesets: Array<Codesets>;
}
