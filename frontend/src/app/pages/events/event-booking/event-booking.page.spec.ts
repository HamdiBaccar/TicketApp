import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventBookingPage } from './event-booking.page';

describe('EventBookingPage', () => {
  let component: EventBookingPage;
  let fixture: ComponentFixture<EventBookingPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EventBookingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
