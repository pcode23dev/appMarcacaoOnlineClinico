import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentMenutop } from './component-menutop';

describe('ComponentMenutop', () => {
  let component: ComponentMenutop;
  let fixture: ComponentFixture<ComponentMenutop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentMenutop]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentMenutop);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
