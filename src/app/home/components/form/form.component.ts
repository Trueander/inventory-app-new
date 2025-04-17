import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Button, ButtonDirective} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {NgForOf, NgIf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CardModule} from "primeng/card";
import {SelectButtonModule} from "primeng/selectbutton";
import {CheckboxModule} from "primeng/checkbox";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {PartNumberBoxSelectionComponent} from "../part-number-box-selection/part-number-box-selection.component";
import {ChipModule} from "primeng/chip";
import {InventoryService} from "../../services/inventory.service";
import {TooltipModule} from "primeng/tooltip";

@Component({
  selector: 'app-form',
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
    ChipModule,
    NgForOf,
    TooltipModule
  ],
  providers: [DialogService],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {
  @Input() category!: string;
  @Output() close = new EventEmitter<void>();
  form!: FormGroup;
  ref: DynamicDialogRef | undefined;
  partNumberModalResponse!: {type: string, condition: string};
  indexForm: number = 0;

  constructor(private router: Router,
              private fb: FormBuilder,
              private inventoryService: InventoryService,
              public dialogService: DialogService) {
    this.formInit();
  }

  ngOnInit() {
  }

  showPartNumberBox(index?: number): void {
    let formGroup!: FormGroup;
    if(index !== undefined) {
      formGroup = this.itemsFormArray.at(index) as FormGroup;
    }
    this.ref = this.dialogService.open(PartNumberBoxSelectionComponent, {
      showHeader: false,
      data: {
        partNumberItem: formGroup
      }
    });

    this.ref.onClose.subscribe((result: FormGroup) => {
      if(result) {
        let index = result.get('index')?.value;

        if(index === null) {
          result.get('index')?.setValue(this.indexForm);
          this.indexForm = this.indexForm + 1;
          this.itemsFormArray.push(result);
        }else {
          const indexAux = this.itemsFormArray.controls.findIndex(ctrl => ctrl.get('index')?.value === index);
          this.itemsFormArray.at(indexAux).patchValue(result.value);
        }
      }
    });
  }

  getTextCaptureSerialNumber(index: number): boolean {
    return this.itemsFormArray.at(index).get('captureSerialNumber')?.value;
  }

  private formInit(): void {
    this.form = this.fb.group({
      po: this.fb.control(null, [Validators.required]),
      totalQuantity: this.fb.control(null),
      trayQuantity: this.fb.control(null),
      items: this.fb.array([]),
      palletIds: this.fb.array([this.fb.control(null, Validators.required)]),
    });
  }

  isDuplicated(index: number): boolean {
    const formGroup = this.itemsFormArray.at(index);
    const condition = formGroup.get('condition')?.value;
    const partNumber = formGroup.get('partNumber')?.value;

    const isDuplicated = this.itemsFormArray.controls.filter(item =>
      item.get('condition')?.value === condition && item.get('partNumber')?.value === partNumber).length > 1;

    isDuplicated ? formGroup.setErrors({duplicated: true}) : formGroup.setErrors(null);

    return isDuplicated;
  }

  addNewPalletID(): void {
    this.palletIdsFormArray.push(this.fb.control(null, Validators.required))
  }

  removePalletID(index: number): void {
    this.palletIdsFormArray.removeAt(index);
  }

  removeItemPartNumber(index: number): void {
    this.itemsFormArray.removeAt(index);
  }

  closeDialog() {
    this.close.emit();
  }

  continue(): void {
    if(this.form.valid){
      this.inventoryService.updateData(this.form.value);
      this.router.navigate(['detail']);

    } else {
      this.form.markAllAsTouched();
    }
  }

  get palletIdsFormArray(): FormArray {
    return this.form.get('palletIds') as FormArray;
  }

  get itemsFormArray(): FormArray {
    return this.form.get('items') as FormArray;
  }
}
