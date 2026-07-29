import { provideRouter } from '@angular/router';
import { TestBed } from '@angular/core/testing';

import { HomePage } from './home-page';

describe('HomePage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePage],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('renders one primary heading and the product preview', () => {
    const fixture = TestBed.createComponent(HomePage);
    fixture.detectChanges();
    const document = fixture.nativeElement as HTMLElement;

    expect(document.querySelectorAll('h1')).toHaveLength(1);
    expect(document.querySelector('h1')?.textContent).toContain('Keep the things');
    expect(document.querySelector('#preview')).toBeTruthy();
    expect(document.firstElementChild?.querySelectorAll(':scope > section')).toHaveLength(5);
  });

  it('attributes the educational project to TUMO with the official linked mark', () => {
    const fixture = TestBed.createComponent(HomePage);
    fixture.detectChanges();
    const document = fixture.nativeElement as HTMLElement;
    const origin = document.querySelector<HTMLElement>('section[aria-label="Project origin"]');
    const logoLink = origin?.querySelector<HTMLAnchorElement>('a[href="https://tumo.org"]');
    const logo = logoLink?.querySelector<HTMLImageElement>('img');

    expect(origin?.textContent).toContain('Wishlist was built at TUMO as an educational project.');
    expect(logoLink?.getAttribute('rel')).toBe('noopener noreferrer');
    expect(logo?.getAttribute('alt')).toBe('TUMO Center for Creative Technologies');
    expect(logo?.getAttribute('src')).toContain('tumo-logo-white.png');
  });

  it('switches between open and completed wishes', () => {
    const fixture = TestBed.createComponent(HomePage);
    fixture.detectChanges();
    const document = fixture.nativeElement as HTMLElement;
    const doneButton = Array.from(document.querySelectorAll<HTMLButtonElement>('button')).find(
      (button) => button.textContent?.includes('Done'),
    );

    expect(doneButton).toBeTruthy();
    expect(doneButton?.getAttribute('aria-pressed')).toBe('false');

    doneButton?.click();
    fixture.detectChanges();

    expect(doneButton?.getAttribute('aria-pressed')).toBe('true');
    expect(document.textContent).toContain('Train tickets');
  });

  it('moves focus to the destination list when a wish leaves the current view', () => {
    const fixture = TestBed.createComponent(HomePage);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    const markDoneButton = root.querySelector<HTMLButtonElement>(
      'button[aria-label^="Mark Noise-cancelling headphones"]',
    );
    const doneButton = Array.from(root.querySelectorAll<HTMLButtonElement>('button')).find(
      (button) => button.textContent?.includes('Done'),
    );

    markDoneButton?.focus();
    markDoneButton?.click();
    fixture.detectChanges();

    expect(document.activeElement).toBe(doneButton);
  });
});
