import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PartiesPage } from './parties.page';

describe('PartiesPage', () => {
  let component: PartiesPage;
  let fixture: ComponentFixture<PartiesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PartiesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
