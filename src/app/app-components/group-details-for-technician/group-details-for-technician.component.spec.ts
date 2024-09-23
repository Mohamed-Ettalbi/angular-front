import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupDetailsForTechnicianComponent } from './group-details-for-technician.component';

describe('GroupDetailsForTechnicianComponent', () => {
  let component: GroupDetailsForTechnicianComponent;
  let fixture: ComponentFixture<GroupDetailsForTechnicianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupDetailsForTechnicianComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GroupDetailsForTechnicianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
