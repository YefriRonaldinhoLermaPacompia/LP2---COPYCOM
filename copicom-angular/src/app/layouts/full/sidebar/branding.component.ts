import { Component } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-branding',
  imports: [RouterModule],
  template: `
    <a [routerLink]="['/']" class="d-flex align-items-center gap-2 p-2 text-decoration-none">
      <!-- Círculos CMYK -->
      <div class="d-flex align-items-center gap-1">
        <span class="cmyk-circle" style="background: #FFEB3B; width: 12px; height: 12px; border-radius: 50%; display: inline-block;"></span>
        <span class="cmyk-circle" style="background: #00BCD4; width: 12px; height: 12px; border-radius: 50%; display: inline-block;"></span>
        <span class="cmyk-circle" style="background: #E91E63; width: 12px; height: 12px; border-radius: 50%; display: inline-block;"></span>
      </div>
      <!-- Texto COPYCOM -->
      <div class="d-flex flex-column">
        <span class="fw-bold" style="color: #0a081c; font-size: 18px; line-height: 1.2;">COPYCOM</span>
        <span style="color: #6c757d; font-size: 10px; line-height: 1; margin-top: -2px;">IMPRENTA DIGITAL</span>
      </div>
    </a>
  `,
  styles: [`
    .cmyk-circle {
      box-shadow: 0 1px 3px rgba(0,0,0,0.12);
    }
  `]
})
export class BrandingComponent {
  options = this.settings.getOptions();
  constructor(private settings: CoreService) {} 
}
