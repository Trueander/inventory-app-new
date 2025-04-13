import {Component, Input, OnInit} from '@angular/core';
import {Button, ButtonDirective} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {NgIf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {CardModule} from "primeng/card";
import {SelectButtonModule} from "primeng/selectbutton";
import {CheckboxModule} from "primeng/checkbox";
import {DialogService} from "primeng/dynamicdialog";
import {NgxSliderModule, Options} from "@angular-slider/ngx-slider";

@Component({
  selector: 'app-form-step-2',
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
        NgxSliderModule
    ],
  providers: [DialogService],
  templateUrl: './step-2.component.html',
  styleUrl: './step-2.component.scss'
})
export class Step2Component implements OnInit {
  @Input() form!: FormGroup;
  stateOptions: any[] = [{ label: 'YES', value: true },{ label: 'NO', value: false }];
  sliderFormControl = new FormControl<number>(0);

  capacities = this.getCapacities();

  options: Options = {
    floor: 0,
    ceil: this.capacities.length -1, // customValues.length - 1
    step: 1,
    showTicks: true,
    showTicksValues: true,
    translate: (value: number): string => `${this.capacities[value]}GB`,
  };

  ngOnInit(): void {
    this.sliderFormControl.valueChanges.subscribe(value => {
      if(value !== null) {
        this.capacityFC.setValue(this.capacities[value]);
        console.log( this.capacityFC.value)
      }
    });

    let index = this.capacities.findIndex(item => item === this.capacityFC.value);

    if(index !== -1) {
      this.sliderFormControl.setValue(index)
    }
  }

  selectGeneration(item: string): void {
    this.generationFC.setValue(item);
  }

  getCapacities(): number[] {
    return [8, 16, 32, 64];
  }

  getGenerations(): string[] {
    return ['DDR5', 'DDR4','DDR3','DDR2'];
  }

  get captureSerialNumberFC(): FormControl {
    return this.form.get('captureSerialNumber') as FormControl;
  }

  get capacityFC(): FormControl {
    return this.form.get('capacity') as FormControl;
  }

  get generationFC(): FormControl {
    return this.form.get('generation') as FormControl;
  }

}
