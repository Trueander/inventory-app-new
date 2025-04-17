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
import {InventoryService} from "../../../services/inventory.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-form-step-1',
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
    AsyncPipe
  ],
  providers: [DialogService],
  templateUrl: './step-1.component.html',
  styleUrl: './step-1.component.scss'
})
export class Step1Component implements OnInit {
  @Input() form!: FormGroup;
  manufacturers$!: Observable<string[]>;
  types$!: Observable<string[]>;

  constructor(private inventoryService: InventoryService) {
    this.manufacturers$ = this.inventoryService.getManufacturers();
    this.types$ = this.inventoryService.getTypes();
  }

  getConditions(): string[] {
    return ['New', 'Used'];
  }

  selecteType(item: string): void {
    this.typeFC.setValue(item);
  }

  ngOnInit(): void {
  }

  selecteManufacturer(item: string): void {
    this.manufacturerFC.setValue(item);
  }

  selectCondition(condition: string): void {
    this.conditionFC.setValue(condition);
  }

  get typeFC(): FormControl {
    return this.form.get('type') as FormControl;
  }

  get manufacturerFC(): FormControl {
    return this.form.get('manufacturer') as FormControl;
  }

  get conditionFC(): FormControl {
    return this.form.get('condition') as FormControl;
  }
}
