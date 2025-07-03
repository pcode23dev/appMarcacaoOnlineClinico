import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentFiltertop } from './component-filtertop';

describe('ComponentFiltertop', () => {
  let component: ComponentFiltertop;
  let fixture: ComponentFixture<ComponentFiltertop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentFiltertop]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentFiltertop);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
