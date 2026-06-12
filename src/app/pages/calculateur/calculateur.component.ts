import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent } from '../../components/cards/card.component';

@Component({
  selector: 'app-calculateur',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent],
  templateUrl: './calculateur.component.html',
  styleUrls: ['./calculateur.component.css']
})
export class CalculateurComponent {
  // Paramètres standards
  capitalInitial = signal<number>(1000);
  versementMensuel = signal<number>(100);
  tauxAnnuel = signal<number>(7);
  annees = signal<number>(15);

  // Aléas du marché
  activerCrises = signal<boolean>(false);
  frequenceCrise = signal<number>(5);
  intensiteCrise = signal<number>(20);

  // NOUVEAU : Enveloppe fiscale et Frais
  enveloppeFiscale = signal<string>('PEA'); // 'PEA' ou 'CTO_AV'
  fraisGestionAnnuel = signal<number>(0.5); // % de frais par an

  resultat = computed(() => {
    const P = this.capitalInitial();
    const PMT = this.versementMensuel();
    const t = this.annees();
    
    let capitalTotal = P;
    let totalVersements = P;
    let historiqueParAnnee: { annee: number; capital: number }[] = [];

    // Taux de frais mensuel proportionnel
    const tauxFraisMensuel = (this.fraisGestionAnnuel() / 100) / 12;

    // Boucle année par année
    for (let anneeActuelle = 1; anneeActuelle <= t; anneeActuelle++) {
      const estAnneeDeCrise = this.activerCrises() && (anneeActuelle % this.frequenceCrise() === 0);
      
      let tauxAnnuelApplique = this.tauxAnnuel() / 100;
      if (estAnneeDeCrise) {
        tauxAnnuelApplique = -(this.intensiteCrise() / 100);
      }

      const tauxMensuel = tauxAnnuelApplique / 12;

      // Boucle mois par mois
      for (let mois = 0; mois < 12; mois++) {
        // 1. Croissance des intérêts et versement mensuel
        capitalTotal = capitalTotal * (1 + tauxMensuel) + PMT;
        totalVersements += PMT;

        // 2. Prélèvement des frais de gestion sur le capital total en cours
        capitalTotal = capitalTotal * (1 - tauxFraisMensuel);
      }

      historiqueParAnnee.push({
        annee: anneeActuelle,
        capital: Math.round(capitalTotal)
      });
    }

    // CALCUL DE LA FISCALITÉ EN FIN DE SIMULATION
    const plusValueBrute = Math.max(0, capitalTotal - totalVersements);
    let tauxImposition = 0.30; // 30% Flat Tax par défaut (CTO / Assurance-Vie jeune)

    if (this.enveloppeFiscale() === 'PEA') {
      tauxImposition = 0.172; // 17.2% de Prélèvements Sociaux uniquement (si détenu > 5 ans)
    }

    const impotEstime = plusValueBrute * tauxImposition;
    const capitalNet = capitalTotal - impotEstime;

    return {
      capitalFinalBrut: Math.round(capitalTotal * 100) / 100,
      capitalFinalNet: Math.round(capitalNet * 100) / 100,
      totalInvesti: Math.round(totalVersements * 100) / 100,
      plusValueBrute: Math.round(plusValueBrute * 100) / 100,
      impotEstime: Math.round(impotEstime * 100) / 100,
      historique: historiqueParAnnee
    };
  });
}