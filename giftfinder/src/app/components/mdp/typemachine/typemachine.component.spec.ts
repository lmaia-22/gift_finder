import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypemachineComponent } from './typemachine.component';

describe('TypemachineComponent', () => {
  let component: TypemachineComponent;
  let fixture: ComponentFixture<TypemachineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypemachineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypemachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
