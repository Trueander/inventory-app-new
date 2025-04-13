import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor() { }

  getSerialNumbers(boxId: number): Observable<string[]> {
    return of([
      '329d29d232d','329d29d232d','329d29d232d','329d29d232d','329d29d232d',
      '329d29d232d','329d29d232d','329d29d232d', '329d29d232d', '329d29d232d',
      '329d29d232d', '329d29d232d','329d29d232d', '329d29d232d', '329d29d232d'
    ]);
  }
}
