import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionspComponent } from './optionsp.component';

describe('OptionspComponent', () => {
  let component: OptionspComponent;
  let fixture: ComponentFixture<OptionspComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionspComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionspComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
