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
import {NgxSliderModule} from "@angular-slider/ngx-slider";

class PartNumber {
  constructor(public id: number,
              public partnumber: string,
              public image: any,
              public flipper: string,
              public generation: string,
              public size: number,
              public speed: number,
              public type: string) {
  }

}

@Component({
  selector: 'app-form-step-4',
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
  templateUrl: './step-4.component.html',
  styleUrl: './step-4.component.scss'
})
export class Step4Component implements OnInit {
  @Input() form!: FormGroup;
  partNumbers: PartNumber[] = this.getPartNumbers();
  filterPartNumbers: PartNumber[] = this.partNumbers;
  flipperValue: string = '';
  searchFC: FormControl = new FormControl(null);

  ngOnInit(): void {
    this.searchFC.valueChanges.subscribe(text => {
      this.filterPartNumbers = this.partNumbers.filter(part => part.partnumber.includes(text));
    })
  }

  getPartNumbers(): PartNumber[] {
    const ruta = 'ram.png';
    return[
      new PartNumber(1, '111222333', ruta, 'FlipX1', 'DDR4', 8192, 3000, 'RAM'),
      new PartNumber(2, '222333444', ruta, 'FlipX24', 'DDR4', 1024, 2000, 'RAM'),
      new PartNumber(3,'333444555', ruta, 'FlipX48', 'DDR4', 2048, 1000, 'RAM'),
      new PartNumber(4,'533444555', ruta, 'FlipX481', 'DDR4', 2048, 1000, 'RAM'),
      new PartNumber(5,'233444555', ruta, 'FlipX4832', 'DDR4', 2048, 1000, 'RAM'),
    ]
  }

  selectPartNumber(partNumber: PartNumber): void {
    this.form.get('partNumber')?.setValue(partNumber.partnumber);
    this.flipperValue = partNumber.flipper;
  }

}
