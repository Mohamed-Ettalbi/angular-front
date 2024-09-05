import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsListfilteredComponent } from './tickets-listfiltered.component';

describe('TicketsListfilteredComponent', () => {
  let component: TicketsListfilteredComponent;
  let fixture: ComponentFixture<TicketsListfilteredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketsListfilteredComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TicketsListfilteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
