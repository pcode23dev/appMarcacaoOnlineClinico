import { Component } from '@angular/core';
import { ComponentAsideDa } from "../../components/component-aside-da/component-aside-da";
import { ComponentTopDa } from "../../components/component-top-da/component-top-da";

@Component({
  selector: 'app-page-dashboard-admin',
  imports: [ComponentAsideDa, ComponentTopDa],
  templateUrl: './page-dashboard-admin.html',
  styleUrl: './page-dashboard-admin.css'
})
export class PageDashboardAdmin {

}
