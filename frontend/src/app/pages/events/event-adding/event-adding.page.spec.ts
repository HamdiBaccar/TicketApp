import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventAddingPage } from './event-adding.page';

describe('EventAddingPage', () => {
  let component: EventAddingPage;
  let fixture: ComponentFixture<EventAddingPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EventAddingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
