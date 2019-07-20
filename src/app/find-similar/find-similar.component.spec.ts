import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindSimilarComponent } from './find-similar.component';

describe('FindSimilarComponent', () => {
  let component: FindSimilarComponent;
  let fixture: ComponentFixture<FindSimilarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindSimilarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindSimilarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
