import { Component, inject, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs/operators';

declare const gtag: Function;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar">
      <div class="nav-container">
        <a routerLink="/" class="nav-logo">💰 Finance tools</a>
        <ul class="nav-links">
          <li><a routerLink="/" routerLinkActive="active-link" [routerLinkActiveOptions]="{exact: true}">Accueil</a></li>
          <li><a routerLink="/calculateur" routerLinkActive="active-link">Calculateur d'Intérêts Composés</a></li>
          <li><a routerLink="/simulator-dca" routerLinkActive="active-link">Simulateur DCA</a></li>
          <li><a routerLink="/suivi-pea-ct" routerLinkActive="active-link">Suivi PEA/CT</a></li>
        </ul>
      </div>
    </nav>
    <main class="main-content">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .navbar { background-color: #2c3e50; padding: 15px 20px; color: white; }
    .nav-container { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
    .nav-logo { font-size: 1.4rem; font-weight: bold; color: white; text-decoration: none; }
    .nav-links { list-style: none; display: flex; gap: 20px; margin: 0; padding: 0; }
    .nav-links a { color: #cbd5e0; text-decoration: none; font-weight: 500; padding: 8px 12px; border-radius: 6px; }
    .active-link { color: white !important; background-color: #3182ce !important; }
    .main-content { padding: 40px 20px; min-height: calc(100vh - 70px); box-sizing: border-box; }
  `]
})

export class AppComponent implements OnInit {
  private router = inject(Router);

  ngOnInit() {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (typeof gtag !== 'undefined') {
        // Envoie la page réelle à ton compteur G-TKW0HC45GC
        gtag('event', 'page_view', {
          page_path: event.urlAfterRedirects,
          page_title: document.title
        });
      }
    });
  }
}