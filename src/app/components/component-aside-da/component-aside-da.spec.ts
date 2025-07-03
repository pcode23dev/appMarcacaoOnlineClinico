import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentAsideDa } from './component-aside-da';

describe('ComponentAsideDa', () => {
  let component: ComponentAsideDa;
  let fixture: ComponentFixture<ComponentAsideDa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentAsideDa]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentAsideDa);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
