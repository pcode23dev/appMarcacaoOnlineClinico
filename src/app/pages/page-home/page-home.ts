import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-home',
  imports: [CommonModule],
  templateUrl: './page-home.html',
  styleUrl: './page-home.css'
})
export class PageHome {

  constructor(private router: Router) {}

  navegarPara(rota: string): void {
    this.router.navigate([rota]);
  }
}
