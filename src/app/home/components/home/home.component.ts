import {Component} from '@angular/core';
import {CardItem} from "../../models/card-item";
import {NgForOf} from "@angular/common";
import {ButtonDirective} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {CategoryType} from "../../models/category-type";
import {FormComponent} from "../form/form.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgForOf,
    ButtonDirective,
    DialogModule,
    FormComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  cards: CardItem[];
  categoryType: CategoryType = CategoryType.CPU;
  visible: boolean = false;

  showDialog(categoryType: CategoryType): void {
    this.visible = true;
    this.categoryType = categoryType;
  }

  constructor() {
    this.cards = [
      new CardItem('CPU','fa-microchip','#34c759', CategoryType.CPU),
      new CardItem('MEM','fa-memory','#00c7be', CategoryType.RAM),
      new CardItem('HDD','fa-hard-drive','#ff9500', CategoryType.HDD),
      new CardItem('Others','fa-barcode','#ff2d55', CategoryType.OTHERS)
    ];
  }

  closeDialog(): void {
    this.visible = false;
  }
}
