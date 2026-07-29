import { NgOptimizedImage } from '@angular/common';
import { Component, computed, ElementRef, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

import { siteLinks } from '../../core/site-content';

type PreviewScreen = 'wishlist' | 'done';
type Priority = 'low' | 'medium' | 'high';

interface PreviewWish {
  readonly id: number;
  readonly title: string;
  readonly note: string;
  readonly price: string;
  readonly priority: Priority;
  readonly completed: boolean;
}

const INITIAL_WISHES: readonly PreviewWish[] = [
  {
    id: 1,
    title: 'Noise-cancelling headphones',
    note: 'Compare the warranty options',
    price: '249',
    priority: 'high',
    completed: false,
  },
  {
    id: 2,
    title: 'Saturday pottery class',
    note: 'Ask about the beginner session',
    price: '85',
    priority: 'medium',
    completed: false,
  },
  {
    id: 3,
    title: 'Warm reading lamp',
    note: 'Oak finish · product link saved',
    price: '64',
    priority: 'low',
    completed: false,
  },
  {
    id: 4,
    title: 'Train tickets',
    note: 'Window seats',
    price: '38',
    priority: 'medium',
    completed: true,
  },
] as const;

@Component({
  selector: 'app-home-page',
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {
  protected readonly siteLinks = siteLinks;

  protected readonly previewScreen = signal<PreviewScreen>('wishlist');
  protected readonly previewWishes = signal<readonly PreviewWish[]>(INITIAL_WISHES);
  protected readonly previewAnnouncement = signal(
    'Interactive preview ready. Three open wishes and one completed wish.',
  );
  private readonly previewRegion = viewChild<ElementRef<HTMLElement>>('previewRegion');
  private readonly wishlistToggle = viewChild<ElementRef<HTMLButtonElement>>('wishlistToggle');
  private readonly doneToggle = viewChild<ElementRef<HTMLButtonElement>>('doneToggle');

  protected readonly openWishes = computed(() =>
    this.previewWishes().filter((wish) => !wish.completed),
  );
  protected readonly completedWishes = computed(() =>
    this.previewWishes().filter((wish) => wish.completed),
  );
  protected readonly visibleWishes = computed(() =>
    this.previewScreen() === 'wishlist' ? this.openWishes() : this.completedWishes(),
  );
  protected readonly visibleListLabel = computed(() =>
    this.previewScreen() === 'wishlist' ? 'Open wishes' : 'Completed wishes',
  );

  protected selectPreviewScreen(screen: PreviewScreen): void {
    this.previewScreen.set(screen);
    const count = screen === 'wishlist' ? this.openWishes().length : this.completedWishes().length;
    const label = screen === 'wishlist' ? 'open' : 'completed';
    this.previewAnnouncement.set(`Showing ${count} ${label} ${count === 1 ? 'wish' : 'wishes'}.`);
  }

  protected toggleWish(id: number): void {
    const selectedWish = this.previewWishes().find((wish) => wish.id === id);
    if (!selectedWish) {
      return;
    }

    this.previewWishes.update((wishes) =>
      wishes.map((wish) => (wish.id === id ? { ...wish, completed: !wish.completed } : wish)),
    );
    const destinationToggle = selectedWish.completed ? this.wishlistToggle() : this.doneToggle();
    destinationToggle?.nativeElement.focus();
    this.previewAnnouncement.set(
      selectedWish.completed
        ? `${selectedWish.title} moved back to the wishlist.`
        : `${selectedWish.title} moved to Done.`,
    );
  }

  protected resetPreview(): void {
    this.previewWishes.set(INITIAL_WISHES);
    this.previewScreen.set('wishlist');
    this.previewAnnouncement.set('Preview reset. Showing three open wishes.');
  }

  protected displayPrice(price: string): string {
    return `$${price}`;
  }

  protected focusPreview(): void {
    this.previewRegion()?.nativeElement.focus();
  }
}
