import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTechnicianToGroupComponent } from './add-technician-to-group.component';

describe('AddTechnicianToGroupComponent', () => {
  let component: AddTechnicianToGroupComponent;
  let fixture: ComponentFixture<AddTechnicianToGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTechnicianToGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTechnicianToGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
