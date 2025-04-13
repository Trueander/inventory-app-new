import {Component} from '@angular/core';
import {InputNumberModule} from "primeng/inputnumber";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {NgForOf, NgStyle} from "@angular/common";
import {CardModule} from "primeng/card";
import {Button, ButtonDirective} from "primeng/button";
import {InventoryService} from "../../services/inventory.service";
import {delay, tap} from "rxjs";
import Swal from "sweetalert2";

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    InputNumberModule,
    FormsModule,
    InputTextModule,
    NgForOf,
    NgStyle,
    CardModule,
    Button,
    ReactiveFormsModule,
    ButtonDirective
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent {
  serials: string[] = [];
  rowFormControl: FormControl = new FormControl(null, Validators.required);
  colFormControl: FormControl = new FormControl(null, Validators.required);
  processedColumns: number = 0;
  processedRows: number = 0;

  constructor(private inventoryService: InventoryService) {}

  start(): void {
    if(this.colFormControl.invalid || this.rowFormControl.invalid){
      Swal.fire({
        title: "Fill the gaps",
        text: `Columns and rows are required`,
        icon: "warning"
      });

      return;
    }

    this.inventoryService.getSerialNumbers(1)
      .pipe(
        tap(()=> this.loading()),
        delay(1500),
        tap(this.validateMatrix)
      )
      .subscribe();
  }

  private validateMatrix = (serialNumbers: string[]): void => {
    const totalMatrix = this.rowFormControl.value * this.colFormControl.value;

    if(totalMatrix < serialNumbers.length) {
      Swal.fire({
        title: "Verify columns and rows",
        text: `Columns * rows(${totalMatrix}), can't be less than serial numbers(${serialNumbers.length})`,
        icon: "warning"
      });

      return;
    }

    this.processedColumns = this.colFormControl.value;
    this.processedRows = this.rowFormControl.value;

    if(serialNumbers.length < totalMatrix){
      for(let i= serialNumbers.length; i < totalMatrix; i++){
        serialNumbers.push('0');
      }
    }

    this.serials = [...serialNumbers];
  }

  get gridTemplateColumns(): string {
    return `repeat(${this.processedColumns}, 200px)`;
  }

  get gridTemplateRows(): string {
    return `repeat(${this.processedRows}, 1fr)`;
  }

  loading(): void {
    let timerInterval: any;
    Swal.fire({
      title: "Loading...",
      html: "Processing data",
      timer: 1500,
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        timerInterval = setInterval(() => {
        }, 100);
      }
    }).then();
  }
}
