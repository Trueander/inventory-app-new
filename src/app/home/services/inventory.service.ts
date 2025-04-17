import {Injectable, signal} from '@angular/core';
import {BehaviorSubject, from, Observable, of} from "rxjs";
import {PoData} from "../models/po-data";
import {PartNumber} from "../models/part-number";

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private _data = new BehaviorSubject<PoData | null>(null)
  data = this._data.asObservable();

  constructor() { }

  updateData(data: PoData) {
    this._data.next(data);
  }

  getManufacturers(): Observable<string[]> {
    return of(['Samsung', 'Hynix', 'Micron', 'Kingston']);
  }

  getTypes(): Observable<string[]> {
    return of(['RDIMM', 'LRDIMM']);
  }

  getCapacities(): Observable<number[]> {
    return of([8, 16, 32, 64]);
  }

  getGenerations(): Observable<string[]> {
    return of(['DDR5', 'DDR4','DDR3','DDR2']);
  }

  trayTypes(): Observable<string[]> {
    return of(['Type 1', 'Type 2']);
  }

  getPartNumbers(): Observable<PartNumber[]> {
    const ruta = 'ram.png';
    return of([
      new PartNumber(1, '111222333', ruta, 'FlipX1', 'DDR4', 8192, 3000, 'RAM'),
      new PartNumber(2, '222333444', ruta, 'FlipX24', 'DDR4', 1024, 2000, 'RAM'),
      new PartNumber(3,'333444555', ruta, 'FlipX48', 'DDR4', 2048, 1000, 'RAM'),
      new PartNumber(4,'533444555', ruta, 'FlipX481', 'DDR4', 2048, 1000, 'RAM'),
      new PartNumber(5,'233444555', ruta, 'FlipX4832', 'DDR4', 2048, 1000, 'RAM'),
    ]);
  }

  getLabels(): Observable<string[]> {
    return of(['Label 1', 'Label 2', 'Label 3', 'Label 4']);
  }

  getCustomerPN(): Observable<string> {
    return of('x1x2x3x4')
  }
}
