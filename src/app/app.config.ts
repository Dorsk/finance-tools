import { ApplicationConfig, provideZoneChangeDetection, LOCALE_ID } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import localeFr from '@angular/common/locales/fr';

import { HomeComponent } from './pages/home/home.component';
import { CalculateurComponent } from './pages/calculateur/calculateur.component';
import { SuiviPeaComponent } from './pages/suivi-compte/suivi-pea.component';
import { DcaSimulatorComponent } from './pages/dca-simulator/dca-simulator.component';

registerLocaleData(localeFr);

export const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent, 
    title: "Calculateur & Simulateurs - Finance Tools",
    data: { description: "Découvrez nos outils financiers gratuits : calculateur d'intérêts composés, simulateur de stratégie DCA historique et suivi de portefeuille PEA/CT." }
  },
  { 
    path: 'calculateur', 
    component: CalculateurComponent, 
    title: "Calculateur d'Intérêts Composés - Finance Tools", 
    data: { description: "Estimez la croissance de votre épargne à long terme grâce aux intérêts composés. Visualisez vos gains futurs avec notre graphique interactif." }
  },
  { 
    path: 'suivi-pea-ct', 
    component: SuiviPeaComponent, 
    title: "Suivi PEA/CT - Analyse de Portefeuille", 
    data: { description: "Pilotez et optimisez vos investissements sur PEA et Compte Titres. Suivez la performance globale de vos actions et ETF." }
  },
  { 
    path: 'simulator-dca', 
    component: DcaSimulatorComponent, 
    title: "Simulateur DCA S&P 500 - Test Stratégie", 
    data: { description: "Simulez un investissement programmé (DCA) sur le S&P 500 de 1990 à 2026. Analysez l'impact d'un capital de départ sur vos performances." }
  },
  { 
    path: '**', 
    redirectTo: '' 
  }
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), 
    { provide: LOCALE_ID, useValue: 'fr-FR' }, 
    provideHttpClient()
  ]
};