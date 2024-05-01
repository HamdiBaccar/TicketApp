import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookedeventsPage } from './bookedevents.page';

describe('BookedeventsPage', () => {
  let component: BookedeventsPage;
  let fixture: ComponentFixture<BookedeventsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BookedeventsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
