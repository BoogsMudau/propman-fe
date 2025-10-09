import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceLog } from './maintenance-log';

describe('MaintenanceLog', () => {
  let component: MaintenanceLog;
  let fixture: ComponentFixture<MaintenanceLog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaintenanceLog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaintenanceLog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
