import {Component, Input, OnInit} from '@angular/core';
import {Button, ButtonDirective} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {AsyncPipe, NgIf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {CardModule} from "primeng/card";
import {SelectButtonModule} from "primeng/selectbutton";
import {CheckboxModule} from "primeng/checkbox";
import {DialogService} from "primeng/dynamicdialog";
import {NgxSliderModule, Options} from "@angular-slider/ngx-slider";
import {Observable} from "rxjs";
import {InventoryService} from "../../../services/inventory.service";

@Component({
  selector: 'app-form-step-3',
  standalone: true,
  imports: [
    Button,
    InputTextModule,
    NgIf,
    PaginatorModule,
    ReactiveFormsModule,
    ButtonDirective,
    CardModule,
    SelectButtonModule,
    CheckboxModule,
    NgxSliderModule,
    AsyncPipe
  ],
  providers: [DialogService],
  templateUrl: './step-3.component.html',
  styleUrl: './step-3.component.scss'
})
export class Step3Component {
  @Input() form!: FormGroup;
  trayTypes$!: Observable<string[]>;

  constructor(private inventoryService: InventoryService) {
    this.trayTypes$ = this.inventoryService.trayTypes();
  }

  selectetTrayType(item: string): void {
    this.traySelectionFC.setValue(item)
  }

  get traySelectionFC(): FormControl {
    return  this.form.get('traySelection') as FormControl;
  }
}
