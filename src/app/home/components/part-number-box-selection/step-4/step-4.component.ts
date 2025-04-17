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
import {PartNumber} from "../../../models/part-number";
import {InventoryService} from "../../../services/inventory.service";

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
  partNumbers: PartNumber[] = [];
  filterPartNumbers: PartNumber[] = [];
  searchFC: FormControl = new FormControl(null);

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.inventoryService.getPartNumbers().subscribe(result => {
      this.partNumbers = result
      this.filterPartNumbers = result;
    });

    this.searchFC.valueChanges.subscribe(text => {
      this.filterPartNumbers = this.partNumbers.filter(part => part.partnumber.includes(text));
    });
  }

  selectPartNumber(partNumber: PartNumber): void {
    this.form.get('partNumber')?.setValue(partNumber.partnumber);
    this.form.get('usedFlipper')?.setValue(partNumber.flipper);
  }
}
