import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlackboardComponent } from './blackboard.component';

describe('BlackboardComponent', () => {
  let component: BlackboardComponent;
  let fixture: ComponentFixture<BlackboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlackboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlackboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
