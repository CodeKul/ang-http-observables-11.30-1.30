import { TestBed, inject } from '@angular/core/testing';

import { MyWebService } from './my-web.service';

describe('MyWebService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyWebService]
    });
  });

  it('should be created', inject([MyWebService], (service: MyWebService) => {
    expect(service).toBeTruthy();
  }));
});
