import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuperUserPage } from './super-user.page';

describe('SuperUserPage', () => {
  let component: SuperUserPage;
  let fixture: ComponentFixture<SuperUserPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SuperUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
