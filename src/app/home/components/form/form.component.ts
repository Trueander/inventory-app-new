import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Button, ButtonDirective} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {NgForOf, NgIf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CategoryType} from "../../models/category-type";
import {Router} from "@angular/router";
import {CardModule} from "primeng/card";
import {SelectButtonModule} from "primeng/selectbutton";
import {CheckboxModule} from "primeng/checkbox";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {PartNumberBoxSelectionComponent} from "../part-number-box-selection/part-number-box-selection.component";
import {ChipModule} from "primeng/chip";

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
    NgForOf
  ],
  providers: [DialogService],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {
  @Input() categoryType: CategoryType = CategoryType.CPU;
  @Output() close = new EventEmitter<void>();
  form!: FormGroup;
  ref: DynamicDialogRef | undefined;
  partNumberModalResponse!: {type: string, condition: string};
  indexForm: number = 0;

  constructor(private router: Router,
              private fb: FormBuilder,
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
          console.log(this.itemsFormArray.length, 'index')
          result.get('index')?.setValue(this.indexForm);
          this.indexForm = this.indexForm + 1;
          this.itemsFormArray.push(result);
        }else {
          const indexAux = this.itemsFormArray.controls.findIndex(ctrl => ctrl.get('id')?.value === index);
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
      items: this.fb.array([]),
      palletIds: this.fb.array([this.fb.control(null, Validators.required)]),
    });
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
