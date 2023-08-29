import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditCallPage } from './edit-call.page';

describe('EditCallPage', () => {
  let component: EditCallPage;
  let fixture: ComponentFixture<EditCallPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditCallPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
