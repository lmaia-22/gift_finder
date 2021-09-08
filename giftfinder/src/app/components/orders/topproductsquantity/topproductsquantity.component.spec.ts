import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopproductsquantityComponent } from './topproductsquantity.component';

describe('TopproductsquantityComponent', () => {
  let component: TopproductsquantityComponent;
  let fixture: ComponentFixture<TopproductsquantityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopproductsquantityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopproductsquantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
