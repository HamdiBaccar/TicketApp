import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeaturedeventsPage } from './featuredevents.page';

describe('FeaturedeventsPage', () => {
  let component: FeaturedeventsPage;
  let fixture: ComponentFixture<FeaturedeventsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FeaturedeventsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
