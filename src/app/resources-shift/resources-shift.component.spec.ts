import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcesShiftComponent } from './resources-shift.component';

describe('ResourcesShiftComponent', () => {
  let component: ResourcesShiftComponent;
  let fixture: ComponentFixture<ResourcesShiftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourcesShiftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcesShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
