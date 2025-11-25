import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneracionDialogComponent } from './generacion-dialog.component';

describe('GeneracionDialogComponent', () => {
  let component: GeneracionDialogComponent;
  let fixture: ComponentFixture<GeneracionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneracionDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneracionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
