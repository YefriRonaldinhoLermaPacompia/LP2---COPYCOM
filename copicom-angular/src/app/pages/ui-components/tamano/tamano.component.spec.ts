import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TamanoComponent } from './tamano.component';

describe('TamanoComponent', () => {
  let component: TamanoComponent;
  let fixture: ComponentFixture<TamanoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TamanoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TamanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
