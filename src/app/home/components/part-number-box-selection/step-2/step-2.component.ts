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
import {InventoryService} from "../../../services/inventory.service";
import {Observable} from "rxjs";

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
    NgxSliderModule,
    AsyncPipe
  ],
  providers: [DialogService],
  templateUrl: './step-2.component.html',
  styleUrl: './step-2.component.scss'
})
export class Step2Component implements OnInit {
  @Input() form!: FormGroup;
  stateOptions: any[] = [{ label: 'YES', value: true },{ label: 'NO', value: false }];
  sliderFormControl = new FormControl<number>(0);
  capacities: number[] = []
  generations$!: Observable<string[]>;
  options!: Options;

  constructor(private inventoryService: InventoryService) {
    this.generations$ = this.inventoryService.getGenerations();
  }

  ngOnInit(): void {
    this.inventoryService.getCapacities()
      .subscribe(capacities => {
        this.capacities = capacities;
        this.initSlider();
      });

  }

  private initOptions(): void {
    this.options = {
      floor: 0,
      ceil: this.capacities.length -1,
      step: 1,
      showTicks: true,
      showTicksValues: true,
      translate: (value: number): string => `${this.capacities[value]}GB`,
    };
  }

  private initSlider(): void  {
    this.initOptions();
    this.sliderFormControl.valueChanges.subscribe(value => {
      if(value !== null) {
        this.capacityFC.setValue(this.capacities[value]);
      }
    });

    if(!this.capacities.length) {
      return
    }

    if(this.capacityFC.value != undefined) {
      let index = this.capacities.findIndex(item => item === this.capacityFC.value);

      if(index !== -1) {
        this.sliderFormControl.setValue(index)
      }
    }else {
      this.sliderFormControl.setValue(0);
    }
  }

  selectGeneration(item: string): void {
    this.generationFC.setValue(item);
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
