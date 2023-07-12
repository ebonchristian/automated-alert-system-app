import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotNormalPage } from './not-normal.page';

describe('NotNormalPage', () => {
  let component: NotNormalPage;
  let fixture: ComponentFixture<NotNormalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NotNormalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
