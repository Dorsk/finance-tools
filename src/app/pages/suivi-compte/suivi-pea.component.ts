import { Component } from '@angular/core';
import { CardComponent } from '../../components/cards/card.component';

@Component({
  selector: 'app-suivi-pea',
  standalone: true,
  imports: [CardComponent],
  template: `
    <div class="container">
      <h1>📈 Suivi de votre PEA / Compte Titres (CT)</h1>
      <p style="color: #7f8c8d;">Pilotez votre portefeuille boursier et visualisez vos lignes en temps réel</p>
      
      <app-card title="Statut du Module">
        <div style="text-align: center; padding: 20px 0;">
          <span style="font-size: 3rem; display: block; margin-bottom: 15px;">🛠️</span>
          <h3>Module en cours de développement</h3>
          <p style="color: #718096; max-width: 500px; margin: 0 auto;">Cet espace contiendra bientôt un tableau de bord analytique complet permettant d'enregistrer vos ordres.</p>
        </div>
      </app-card>
    </div>
  `,
  styles: [`.container { max-width: 1000px; margin: 0 auto; }`]
})
export class SuiviPeaComponent {}