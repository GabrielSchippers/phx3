import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorTypeComponent } from './instructor-type.component';

describe('InstructorTypeComponent', () => {
  let component: InstructorTypeComponent;
  let fixture: ComponentFixture<InstructorTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructorTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
