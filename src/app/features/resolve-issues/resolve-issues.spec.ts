import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolveIssues } from './resolve-issues';

describe('ResolveIssues', () => {
  let component: ResolveIssues;
  let fixture: ComponentFixture<ResolveIssues>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResolveIssues]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResolveIssues);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
