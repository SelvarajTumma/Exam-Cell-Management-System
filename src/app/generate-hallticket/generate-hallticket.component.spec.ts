import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateHallticketComponent } from './generate-hallticket.component';

describe('GenerateHallticketComponent', () => {
  let component: GenerateHallticketComponent;
  let fixture: ComponentFixture<GenerateHallticketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateHallticketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateHallticketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
