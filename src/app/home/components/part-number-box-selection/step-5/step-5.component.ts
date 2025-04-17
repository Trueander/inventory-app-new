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
import {NgxSliderModule} from "@angular-slider/ngx-slider";
import {InventoryService} from "../../../services/inventory.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-form-step-5',
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
  templateUrl: './step-5.component.html',
  styleUrl: './step-5.component.scss'
})
export class Step5Component {
  @Input() form!: FormGroup;
  labels$!: Observable<string[]>;

  constructor(private inventoryService: InventoryService) {
    this.labels$ = this.inventoryService.getLabels();
  }

  selectLabel(item: string): void {
    this.labelFC.setValue(item);
  }

  get labelFC(): FormControl {
    return  this.form.get('label') as FormControl;
  }
}
