import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNaoregistradoUtente } from './page-naoregistrado-utente';

describe('PageNaoregistradoUtente', () => {
  let component: PageNaoregistradoUtente;
  let fixture: ComponentFixture<PageNaoregistradoUtente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageNaoregistradoUtente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageNaoregistradoUtente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
