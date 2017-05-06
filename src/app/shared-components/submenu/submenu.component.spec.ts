import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnLearnlangComponent } from './btn-learnlang.component';

describe('BtnLearnlangComponent', () => {
  let component: BtnLearnlangComponent;
  let fixture: ComponentFixture<BtnLearnlangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtnLearnlangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnLearnlangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
