import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneracionComponent } from './generacion.component';

describe('GeneracionComponent', () => {
  let component: GeneracionComponent;
  let fixture: ComponentFixture<GeneracionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneracionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
