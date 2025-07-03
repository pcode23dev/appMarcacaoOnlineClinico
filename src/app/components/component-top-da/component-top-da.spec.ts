import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentTopDa } from './component-top-da';

describe('ComponentTopDa', () => {
  let component: ComponentTopDa;
  let fixture: ComponentFixture<ComponentTopDa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentTopDa]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentTopDa);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
