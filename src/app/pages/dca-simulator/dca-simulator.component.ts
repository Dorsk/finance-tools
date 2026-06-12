import { Component, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent } from '../../components/cards/card.component';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, registerables, Chart } from 'chart.js';

Chart.register(...registerables);

interface Sp500History {
  [annee: string]: number[];
}

const SP500_DATA_INLINE: Sp500History = {
  "1990": [329, 331, 339, 330, 361, 358, 356, 322, 306, 304, 322, 330],
  "1991": [343, 367, 375, 375, 389, 371, 387, 395, 387, 392, 375, 417],
  "1992": [408, 412, 404, 412, 415, 408, 424, 414, 417, 418, 431, 435],
  "1993": [438, 443, 451, 440, 450, 450, 448, 463, 458, 467, 461, 466],
  "1994": [481, 467, 445, 450, 456, 444, 458, 475, 462, 464, 453, 459],
  "1995": [470, 481, 500, 514, 533, 544, 562, 561, 584, 581, 605, 615],
  "1996": [636, 640, 645, 654, 669, 670, 639, 651, 687, 705, 757, 740],
  "1997": [786, 791, 757, 801, 848, 885, 954, 899, 947, 914, 955, 970],
  "1998": [980, 1049, 1101, 1111, 1090, 1133, 1120, 1017, 1017, 1098, 1192, 1229],
  "1999": [1279, 1238, 1286, 1335, 1301, 1372, 1328, 1320, 1282, 1362, 1414, 1469],
  "2000": [1394, 1366, 1498, 1452, 1420, 1454, 1430, 1517, 1436, 1429, 1314, 1320],
  "2001": [1366, 1239, 1160, 1249, 1255, 1224, 1211, 1133, 1040, 1059, 1139, 1148],
  "2002": [1130, 1106, 1147, 1076, 1067, 989, 911, 916, 815, 885, 936, 879],
  "2003": [855, 841, 848, 916, 963, 974, 990, 1008, 995, 1050, 1058, 1111],
  "2004": [1131, 1144, 1126, 1107, 1120, 1140, 1101, 1104, 1114, 1130, 1173, 1211],
  "2005": [1181, 1203, 1180, 1156, 1191, 1191, 1234, 1220, 1228, 1207, 1249, 1248],
  "2006": [1280, 1280, 1294, 1310, 1270, 1270, 1276, 1303, 1335, 1377, 1400, 1418],
  "2007": [1438, 1406, 1420, 1482, 1530, 1503, 1458, 1473, 1526, 1549, 1481, 1468],
  "2008": [1378, 1330, 1322, 1385, 1400, 1280, 1267, 1282, 1166, 968, 896, 903],
  "2009": [825, 735, 797, 872, 919, 919, 987, 1020, 1057, 1036, 1095, 1115],
  "2010": [1073, 1104, 1169, 1186, 1089, 1030, 1101, 1049, 1141, 1183, 1180, 1257],
  "2011": [1286, 1327, 1325, 1363, 1345, 1320, 1292, 1218, 1131, 1253, 1246, 1257],
  "2012": [1312, 1365, 1408, 1397, 1310, 1362, 1379, 1406, 1440, 1412, 1415, 1426],
  "2013": [1498, 1514, 1569, 1597, 1630, 1606, 1685, 1632, 1681, 1756, 1805, 1848],
  "2014": [1782, 1859, 1872, 1883, 1923, 1960, 1930, 2003, 1972, 2018, 2067, 2058],
  "2015": [2020, 2104, 2067, 2085, 2107, 2063, 2103, 1972, 1920, 2079, 2080, 2043],
  "2016": [1940, 1932, 2059, 2065, 2096, 2098, 2173, 2170, 2168, 2126, 2198, 2238],
  "2017": [2278, 2363, 2362, 2384, 2411, 2423, 2470, 2471, 2519, 2575, 2647, 2673],
  "2018": [2823, 2713, 2640, 2648, 2705, 2718, 2816, 2901, 2913, 2711, 2760, 2506],
  "2019": [2704, 2784, 2834, 2945, 2752, 2941, 2980, 2926, 2976, 3037, 3140, 3230],
  "2020": [3225, 2954, 2584, 2912, 3044, 3100, 3271, 3500, 3363, 3269, 3621, 3756],
  "2021": [3714, 3811, 3972, 4181, 4204, 4297, 4395, 4522, 4307, 4605, 4567, 4766],
  "2022": [4515, 4373, 4530, 4131, 4132, 3785, 4130, 3955, 3585, 3871, 4080, 3839],
  "2023": [4076, 3970, 4109, 4169, 4179, 4450, 4588, 4507, 4288, 4193, 4567, 4769],
  "2024": [4845, 5096, 5254, 5035, 5277, 5460, 5522, 5648, 5762, 5705, 5900, 6032],
  "2025": [6040, 5954, 5611, 5569, 5911, 6204, 6339, 6460, 6688, 6840, 6849, 6845],
  "2026": [6939, 6878, 6528, 7209, 7580, 7437, 7450, 7480, 7520, 7560, 7610, 7650]
};

@Component({
  selector: 'app-dca-simulator',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent, BaseChartDirective],
  templateUrl: './dca-simulator.component.html',
  styleUrls: ['../calculateur/calculateur.component.css', './dca-simulator.component.css']
})
export class DcaSimulatorComponent {
  // Signaux réactifs pour les entrées utilisateur
  dateDebut = signal<string>('1990-01-01');
  capitalInitial = signal<number>(1000); // <-- NOUVEAU SIGNAL (Valeur par défaut 1000 €)
  sommeMensuelle = signal<number>(200);
  frequence = signal<string>('1_MOIS');

  simulation = computed(() => {
    const dateSaisie = new Date(this.dateDebut());
    let anneeEnCours = dateSaisie.getFullYear();
    let moisEnCours = dateSaisie.getMonth();
    
    const initial = this.capitalInitial() || 0; // Sécurité si le champ est vide
    const budgetMensuel = this.sommeMensuelle();
    const freq = this.frequence();
    const finAnnee = 2026;

    // Initialisation avec le capital de départ
    let totalInvesti = initial;
    let nbrPartsPossedees = 0;
    let dernierPrixConnu = 330;

    const labels: string[] = [];
    const dataInvesti: number[] = [];
    const dataCapital: number[] = [];

    let achatsParMois = 1;
    let montantParAchat = budgetMensuel;

    if (freq === '2_MOIS') {
      achatsParMois = 2;
      montantParAchat = budgetMensuel / 2;
    } else if (freq === '3_MOIS') {
      achatsParMois = 0.333;
      montantParAchat = budgetMensuel * 3;
    }

    // Achat des premières parts avec le capital initial au premier cours connu
    const premierCours = SP500_DATA_INLINE[anneeEnCours.toString()]?.[moisEnCours];
    if (premierCours) {
      dernierPrixConnu = premierCours;
    }
    if (initial > 0) {
      nbrPartsPossedees += initial / dernierPrixConnu;
    }

    let compteurMois = 0;

    // Simulation temporelle mois par mois
    while (anneeEnCours <= finAnnee) {
      const coursDuMois = SP500_DATA_INLINE[anneeEnCours.toString()]?.[moisEnCours];
      if (coursDuMois) {
        dernierPrixConnu = coursDuMois;
      }

      // Application des règles de versement récurrent
      if (freq === '1_MOIS') {
        nbrPartsPossedees += montantParAchat / dernierPrixConnu;
        totalInvesti += montantParAchat;
      } else if (freq === '2_MOIS') {
        nbrPartsPossedees += (montantParAchat / dernierPrixConnu) * 2;
        totalInvesti += montantParAchat * 2;
      } else if (freq === '3_MOIS' && compteurMois % 3 === 0) {
        nbrPartsPossedees += montantParAchat / dernierPrixConnu;
        totalInvesti += montantParAchat;
      }

      // Historisation à chaque fin d'année
      if (moisEnCours === 11) {
        labels.push(`Fin ${anneeEnCours}`);
        dataInvesti.push(Math.round(totalInvesti));
        dataCapital.push(Math.round(nbrPartsPossedees * dernierPrixConnu));
      }

      moisEnCours++;
      compteurMois++;
      if (moisEnCours > 11) {
        moisEnCours = 0;
        anneeEnCours++;
      }
    }

    const valeurPortefeuilleFinale = nbrPartsPossedees * dernierPrixConnu;
    const plusValue = valeurPortefeuilleFinale - totalInvesti;
    const perf = totalInvesti > 0 ? (plusValue / totalInvesti) * 100 : 0;

    return {
      capitalFinal: Math.round(valeurPortefeuilleFinale),
      totalInvesti: Math.round(totalInvesti),
      plusValue: Math.round(plusValue),
      performanceGlobale: Math.round(perf * 100) / 100,
      chartData: { labels, dataInvesti, dataCapital }
    };
  });

  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'top' } },
    scales: { y: { ticks: { callback: (val) => val + ' €' } } }
  };

  chartData: ChartConfiguration['data'] = { datasets: [] };

  constructor() {
    effect(() => {
      const sim = this.simulation();
      this.chartData = {
        labels: sim.chartData.labels,
        datasets: [
          {
            data: sim.chartData.dataInvesti,
            label: 'Total Versements (€)',
            borderColor: '#718096',
            backgroundColor: 'rgba(113, 128, 150, 0.1)',
            fill: true,
            tension: 0.1
          },
          {
            data: sim.chartData.dataCapital,
            label: 'Versements + Intérêts (Portefeuille)',
            borderColor: '#3182ce',
            backgroundColor: 'rgba(49, 130, 206, 0.2)',
            fill: true,
            tension: 0.1
          }
        ]
      };
    });
  }
}