import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdate } from './create-update';

describe('CreateUpdate', () => {
  let component: CreateUpdate;
  let fixture: ComponentFixture<CreateUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
