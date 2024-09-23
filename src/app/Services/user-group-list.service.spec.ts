import { TestBed } from '@angular/core/testing';

import { UserGroupListService } from './user-group-list.service';

describe('UserGroupListService', () => {
  let service: UserGroupListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserGroupListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
