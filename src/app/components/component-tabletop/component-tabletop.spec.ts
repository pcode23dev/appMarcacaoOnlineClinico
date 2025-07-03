import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentTabletop } from './component-tabletop';

describe('ComponentTabletop', () => {
  let component: ComponentTabletop;
  let fixture: ComponentFixture<ComponentTabletop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentTabletop]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentTabletop);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
