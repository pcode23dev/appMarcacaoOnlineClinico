import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentCountertop } from './component-countertop';

describe('ComponentCountertop', () => {
  let component: ComponentCountertop;
  let fixture: ComponentFixture<ComponentCountertop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentCountertop]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentCountertop);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
