import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscaCepComponent } from './busca-cep.component';

describe('BuscaCepComponent', () => {
  let component: BuscaCepComponent;
  let fixture: ComponentFixture<BuscaCepComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuscaCepComponent]
    });
    fixture = TestBed.createComponent(BuscaCepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
