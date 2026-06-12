import { Component, input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  template: `
    <div class="card">
      @if (title()) {
        <h2 class="card-title">{{ title() }}</h2>
      }
      <div class="card-content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .card { background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-bottom: 20px; }
    .card-title { font-size: 1.4rem; color: #34495e; margin-top: 0; margin-bottom: 25px; border-bottom: 2px solid #ecf0f1; padding-bottom: 10px; }
    .card-content { display: block; }
  `]
})
export class CardComponent {
  title = input<string>('');
}