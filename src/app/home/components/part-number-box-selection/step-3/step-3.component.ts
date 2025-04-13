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
  selector: 'app-form-step-3',
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
  templateUrl: './step-3.component.html',
  styleUrl: './step-3.component.scss'
})
export class Step3Component implements OnInit {
  @Input() form!: FormGroup;

  ngOnInit(): void {}

  selectetTrayType(item: string): void {
    this.traySelectionFC.setValue(item)
  }

  trayTypes(): string[] {
    return ['Type 1', 'Type 2'];
  }

  get traySelectionFC(): FormControl {
    return  this.form.get('traySelection') as FormControl;
  }
}
