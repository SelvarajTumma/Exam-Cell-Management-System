import { TestBed } from '@angular/core/testing';

import { ExamSystemService } from './exam-system.service';

describe('ExamSystemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExamSystemService = TestBed.get(ExamSystemService);
    expect(service).toBeTruthy();
  });
});
