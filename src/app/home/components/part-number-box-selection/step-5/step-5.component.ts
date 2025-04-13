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
        NgxSliderModule
    ],
  providers: [DialogService],
  templateUrl: './step-5.component.html',
  styleUrl: './step-5.component.scss'
})
export class Step5Component {
  @Input() form!: FormGroup;

  selectLabel(item: string): void {
    this.labelFC.setValue(item);
  }

  getLabels(): string[] {
    return ['Label 1', 'Label 2', 'Label 3', 'Label 4'];
  }

  get labelFC(): FormControl {
    return  this.form.get('label') as FormControl;
  }
}
