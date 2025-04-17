import {PartNumberItem} from "./part-number-item";

export class PoData {
  constructor(public po: string,
              public palletIds: string[],
              public items: PartNumberItem[]) {
  }
}
