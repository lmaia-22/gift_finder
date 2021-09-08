import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricplanComponent } from './fabricplan.component';

describe('FabricplanComponent', () => {
  let component: FabricplanComponent;
  let fixture: ComponentFixture<FabricplanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FabricplanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FabricplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
