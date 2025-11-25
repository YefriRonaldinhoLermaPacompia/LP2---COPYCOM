import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcabadoDialogComponent } from './acabado-dialog.component';

describe('AcabadoDialogComponent', () => {
  let component: AcabadoDialogComponent;
  let fixture: ComponentFixture<AcabadoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcabadoDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcabadoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
