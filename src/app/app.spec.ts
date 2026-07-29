import { provideRouter } from '@angular/router';
import { TestBed } from '@angular/core/testing';

import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('renders the shared accessible shell', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const document = fixture.nativeElement as HTMLElement;

    expect(document.querySelector('nav')?.getAttribute('aria-label')).toBe('Main navigation');
    expect(
      document.querySelector<HTMLAnchorElement>('a[href="#main-content"]')?.textContent,
    ).toContain('Skip to main content');
    expect(document.querySelector('main')?.id).toBe('main-content');
  });

  it('opens and closes the mobile navigation disclosure', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    const toggle = root.querySelector<HTMLButtonElement>(
      'button[aria-controls="mobile-navigation"]',
    );

    expect(toggle).toBeTruthy();
    expect(toggle?.getAttribute('aria-expanded')).toBe('false');

    toggle?.click();
    fixture.detectChanges();

    expect(toggle?.getAttribute('aria-expanded')).toBe('true');
    expect(root.querySelector('#mobile-navigation')).toBeTruthy();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();

    expect(toggle?.getAttribute('aria-expanded')).toBe('false');
    expect(root.querySelector('#mobile-navigation')).toBeNull();
  });

  it('moves focus to the main landmark after a client-side route change', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    const outlet = fixture.debugElement.query((element) => element.name === 'router-outlet');
    const main = root.querySelector<HTMLElement>('#main-content');

    outlet.triggerEventHandler('activate');
    outlet.triggerEventHandler('activate');

    expect(document.activeElement).toBe(main);
  });
});
