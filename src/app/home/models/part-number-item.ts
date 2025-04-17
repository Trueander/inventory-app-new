export class PartNumberItem {
  constructor(public partnumber: string,
              public condition: string,
              public type: string,
              public generation: string,
              public capacity: string,
              public manufacturer: string,
              public captureSerialNumber: boolean,
              public traySelection: string,
              public partNumber: string,
              public label: string,
              public customerPN: string,
              public qtyScanned: number,
              public usedFlipper: number) {
  }
}
