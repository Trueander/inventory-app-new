import {Component, OnInit} from '@angular/core';
import {InputNumberModule} from "primeng/inputnumber";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {CardModule} from "primeng/card";
import {Button, ButtonDirective} from "primeng/button";
import {RouterLink} from "@angular/router";
import {PoData} from "../../models/po-data";
import {PartNumberItem} from "../../models/part-number-item";
import {InventoryService} from "../../services/inventory.service";

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
    ButtonDirective,
    RouterLink,
    NgIf
  ],
  providers: [],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit{
  form!: FormGroup;
  title: string = 'MEMORY';

  constructor(private fb: FormBuilder,
              private inventoryService: InventoryService) {
  }

  ngOnInit(): void {
    this.inventoryService.data.subscribe(response => {
      if(response) {
        this.formInit(response);
      }
    });
  }

  get palletIdsFormArray(): FormArray {
    return this.form.get('palletIds') as FormArray;
  }

  get itemsFormArray(): FormArray {
    return this.form.get('items') as FormArray;
  }

  getTextCaptureSerialNumber(index: number): boolean {
    return this.itemsFormArray.at(index).get('captureSerialNumber')?.value;
  }

  private formInit(data: PoData): void {
    this.form = this.fb.group({
      po: this.fb.control(data.po, [Validators.required]),
      totalQuantity: this.fb.control(null),
      trayQuantity: this.fb.control(null),
      items: this.fb.array([]),
      palletIds: this.fb.array([]),
    });
    data.palletIds.forEach(item => this.palletIdsFormArray.push(new FormControl(item)))
    data.items.forEach(item => this.itemsFormArray.push(this.mapToForm(item)));
  }

  mapToForm(item: PartNumberItem): FormGroup {
    return this.fb.group({
      index: this.fb.control(null),
      condition: this.fb.control(item.condition, [Validators.required]),
      type: this.fb.control(item.type, [Validators.required]),
      manufacturer: this.fb.control(item.manufacturer, [Validators.required]),
      generation: this.fb.control(item.generation, [Validators.required]),
      capacity: this.fb.control(item.capacity, [Validators.required]),
      captureSerialNumber: this.fb.control<boolean>(item.captureSerialNumber, [Validators.required]),
      partNumber: this.fb.control(item.partNumber, [Validators.required]),
      customerPN: this.fb.control(item.customerPN),
      qtyScanned: this.fb.control(item.qtyScanned),
      traySelection: this.fb.control(item.traySelection, [Validators.required]),
      label: this.fb.control(item.label, [Validators.required]),
      usedFlipper: this.fb.control(item.usedFlipper, [Validators.required])
    });
  }
}
