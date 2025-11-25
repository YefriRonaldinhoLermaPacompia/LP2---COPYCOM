import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcabadoComponent } from './acabado.component';

describe('AcabadoComponent', () => {
  let component: AcabadoComponent;
  let fixture: ComponentFixture<AcabadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcabadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcabadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
