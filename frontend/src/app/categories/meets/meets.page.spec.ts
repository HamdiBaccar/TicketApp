import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MeetsPage } from './meets.page';

describe('MeetsPage', () => {
  let component: MeetsPage;
  let fixture: ComponentFixture<MeetsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MeetsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
