import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetMarksComponent } from './set-marks.component';

describe('SetMarksComponent', () => {
  let component: SetMarksComponent;
  let fixture: ComponentFixture<SetMarksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetMarksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
