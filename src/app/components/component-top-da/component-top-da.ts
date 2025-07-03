import { Component } from '@angular/core';
import { ComponentMenutop } from "../component-menutop/component-menutop";
import { ComponentCountertop } from "../component-countertop/component-countertop";
import { ComponentFiltertop } from "../component-filtertop/component-filtertop";
import { ComponentTabletop } from "../component-tabletop/component-tabletop";

@Component({
  selector: 'app-component-top-da',
  imports: [ComponentMenutop, ComponentCountertop, ComponentFiltertop, ComponentTabletop],
  templateUrl: './component-top-da.html',
  styleUrls: ['./component-top-da.css', '../../pages/page-dashboard-admin/page-dashboard-admin.css']
})
export class ComponentTopDa {

}
