import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceLogCard } from './maintenance-log-card';

describe('MaintenanceLogCard', () => {
  let component: MaintenanceLogCard;
  let fixture: ComponentFixture<MaintenanceLogCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaintenanceLogCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaintenanceLogCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
