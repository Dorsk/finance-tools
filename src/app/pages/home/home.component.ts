import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="home-container">
      <h1>👋 Bienvenue sur votre Espace Financier</h1>
      <p class="subtitle">Pilotez vos investissements et simulez vos gains futurs.</p>
      
      <div class="features-grid">
        <div class="feature-card" routerLink="/calculateur">
          <div class="icon">📊</div>
          <h3>Calculateur d'Intérêts Composés</h3>
          <p>Simulez l'effet boule de neige et des baisses sur votre épargne à long terme avec des versements mensuels.</p>
        </div>

        <div class="feature-card" routerLink="/simulator-dca">
          <div class="icon">〽️</div>
          <h2>Simulateur DCA Historique</h2>
          <p>Testez une stratégie d'investissement programmé sur les performances réelles du S&P 500 de 1990 à 2026.</p>
        </div>

        <div class="feature-card" routerLink="/suivi-pea-ct">
          <div class="icon">📈</div>
          <h3>Suivi PEA / Compte Titres</h3>
          <p>Analysez la répartition de vos actifs et mesurez vos performances boursières.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .home-container { max-width: 900px; margin: 0 auto; text-align: center; }
    h1 { color: #2c3e50; font-size: 2.2rem; margin-bottom: 10px; }
    .subtitle { color: #7f8c8d; font-size: 1.2rem; margin-bottom: 40px; }
    .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; }
    .feature-card { background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); text-align: left; cursor: pointer; transition: transform 0.2s; }
    .feature-card:hover { transform: translateY(-5px); }
    .icon { font-size: 2.5rem; margin-bottom: 15px; }
    h3 { color: #2c3e50; margin-top: 0; }
    .btn { background: #3182ce; color: white; border: none; padding: 10px 20px; border-radius: 6px; font-weight: bold; cursor: pointer; margin-top: 15px; width: 100%; }
  `]
})
export class HomeComponent {}