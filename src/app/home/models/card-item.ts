import {CategoryType} from "./category-type";

export class CardItem {
  constructor(public title: string,
              public icon: string,
              public backgroundColor: string,
              public categoryType: CategoryType) {
  }
}
