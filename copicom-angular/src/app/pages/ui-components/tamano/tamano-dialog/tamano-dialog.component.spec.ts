import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TamanoDialogComponent } from './tamano-dialog.component';

describe('TamanoDialogComponent', () => {
  let component: TamanoDialogComponent;
  let fixture: ComponentFixture<TamanoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TamanoDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TamanoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
