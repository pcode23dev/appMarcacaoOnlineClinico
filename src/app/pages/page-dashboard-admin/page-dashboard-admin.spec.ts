import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDashboardAdmin } from './page-dashboard-admin';

describe('PageDashboardAdmin', () => {
  let component: PageDashboardAdmin;
  let fixture: ComponentFixture<PageDashboardAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageDashboardAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageDashboardAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
