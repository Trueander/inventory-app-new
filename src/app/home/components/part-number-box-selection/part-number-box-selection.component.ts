import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {Button, ButtonDirective} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {FormComponent} from "../form/form.component";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CardModule} from "primeng/card";
import {CheckboxModule} from "primeng/checkbox";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {StepsModule} from "primeng/steps";
import {SelectButtonModule} from "primeng/selectbutton";
import {SliderModule} from "primeng/slider";
import {NgxSliderModule} from "@angular-slider/ngx-slider";
import {Step1Component} from "./step-1/step-1.component";
import {Step2Component} from "./step-2/step-2.component";
import {Step3Component} from "./step-3/step-3.component";
import {Step4Component} from "./step-4/step-4.component";
import {Step5Component} from "./step-5/step-5.component";

@Component({
  selector: 'app-part-number-box-selection',
  standalone: true,
  imports: [
    NgForOf,
    ButtonDirective,
    DialogModule,
    FormComponent,
    DropdownModule,
    InputTextModule,
    ReactiveFormsModule,
    CardModule,
    CheckboxModule,
    FormsModule,
    Button,
    StepsModule,
    NgIf,
    SelectButtonModule,
    SliderModule,
    NgxSliderModule,
    Step1Component,
    Step2Component,
    Step3Component,
    Step4Component,
    Step5Component
  ],
  templateUrl: './part-number-box-selection.component.html',
  styleUrl: './part-number-box-selection.component.scss'
})
export class PartNumberBoxSelectionComponent implements OnInit{
  //size of step views
  steps = [1,2,3,4,5];
  formGroup!: FormGroup;


  constructor(private ref: DynamicDialogRef,
              public config: DynamicDialogConfig,
              private fb: FormBuilder) {

  }

  ngOnInit() {
    this.formGroup = this.createItem();
    if(this.config.data?.partNumberItem) {
      this.formGroup.patchValue(this.config.data?.partNumberItem.value)
    }
  }


  activeIndex: number = 0;

  private createItem(): FormGroup {
    return this.fb.group({
      index: this.fb.control(null),
      condition: this.fb.control(null, [Validators.required]),
      type: this.fb.control(null, [Validators.required]),
      manufacturer: this.fb.control(null, [Validators.required]),
      generation: this.fb.control(null, [Validators.required]),
      capacity: this.fb.control(null, [Validators.required]),
      captureSerialNumber: this.fb.control<boolean>(false, [Validators.required]),
      partNumber: this.fb.control(null, [Validators.required]),
      customerPN: this.fb.control(null, [Validators.required]),
      qtyScanned: this.fb.control(null),
      traySelection: this.fb.control(null, [Validators.required]),
      label: this.fb.control(null, [Validators.required])
    });
  }

  save(): void {
    this.ref.close(this.formGroup);
  }

  nextStep() {
    console.log(this.formGroup)
    if((this.steps.length -1) === this.activeIndex) {
      this.save();
    }

    if (this.activeIndex < this.steps.length - 1) {
      this.activeIndex++;
    }
  }

  // Go to the previous step
  previousStep() {
    if (this.activeIndex > 0) {
      this.activeIndex--;
    }
  }
}
