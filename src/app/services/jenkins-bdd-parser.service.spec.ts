/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { JenkinsBddParserService } from './jenkins-bdd-parser.service';

describe('Service: JenkinsBddParser', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JenkinsBddParserService]
    });
  });

  it('should ...', inject([JenkinsBddParserService], (service: JenkinsBddParserService) => {
    expect(service).toBeTruthy();
  }));
});
