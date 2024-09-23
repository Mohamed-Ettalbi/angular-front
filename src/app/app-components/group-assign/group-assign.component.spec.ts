import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupAssignComponent } from './group-assign.component';

describe('GroupAssignComponent', () => {
  let component: GroupAssignComponent;
  let fixture: ComponentFixture<GroupAssignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupAssignComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GroupAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
