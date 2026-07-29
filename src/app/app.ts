import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { navigation, siteLinks } from './core/site-content';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
  host: {
    '(document:keydown.escape)': 'closeMenu(true)',
  },
})
export class App {
  protected readonly menuOpen = signal(false);
  protected readonly navigation = navigation;
  protected readonly siteLinks = siteLinks;
  private readonly menuToggle = viewChild<ElementRef<HTMLButtonElement>>('menuToggle');
  private readonly mainContent = viewChild<ElementRef<HTMLElement>>('mainContent');
  private routeHasActivated = false;

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(restoreFocus = false): void {
    if (!this.menuOpen()) {
      return;
    }

    this.menuOpen.set(false);
    if (restoreFocus) {
      this.menuToggle()?.nativeElement.focus();
    }
  }

  protected focusMainContent(): void {
    if (!this.routeHasActivated) {
      this.routeHasActivated = true;
      return;
    }

    this.mainContent()?.nativeElement.focus();
  }
}
