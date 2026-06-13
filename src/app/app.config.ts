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

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'calculateur', component: CalculateurComponent, title: "Calculateur d'Intérêts Composés" },
  { path: 'suivi-pea-ct', component: SuiviPeaComponent, title: "Suivi PEA/CT" },
  { path: 'simulator-dca', component: DcaSimulatorComponent, title: "Simulateur DCA S&P 500" },
  { path: '**', redirectTo: '' }
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), 
    { provide: LOCALE_ID, useValue: 'fr-FR' }, 
    provideHttpClient()
  ]
};