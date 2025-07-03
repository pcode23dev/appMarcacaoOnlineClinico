import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDashboardUser } from './page-dashboard-user';

describe('PageDashboardUser', () => {
  let component: PageDashboardUser;
  let fixture: ComponentFixture<PageDashboardUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageDashboardUser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageDashboardUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
