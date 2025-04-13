import { Routes } from '@angular/router';
import {HomeComponent} from "./home/components/home/home.component";
import {DetailComponent} from "./home/components/detail/detail.component";

export const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'detail', component: DetailComponent
  }
];
