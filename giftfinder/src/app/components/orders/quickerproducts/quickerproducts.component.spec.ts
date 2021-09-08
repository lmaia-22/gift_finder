import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickerproductsComponent } from './quickerproducts.component';

describe('QuickerproductsComponent', () => {
  let component: QuickerproductsComponent;
  let fixture: ComponentFixture<QuickerproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickerproductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickerproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
