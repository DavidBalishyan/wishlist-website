import { Component, computed, signal } from '@angular/core';

import { siteLinks } from '../../core/site-content';

type CopyState = 'idle' | 'copying' | 'copied' | 'failed';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.html',
  styleUrl: './details-page.css',
})
export class DetailsPage {
  protected readonly siteLinks = siteLinks;

  protected readonly productCapabilities = [
    'Create, edit, complete, restore, and permanently delete wishes.',
    'Store a title, price string, product link, notes, local image URI, and priority.',
    'Keep open and completed wishes in one locally persisted collection.',
    'Run from one Expo project on Android, iOS, and the web.',
  ] as const;

  protected readonly productBoundaries = [
    'No account, backend, analytics service, or cloud synchronization.',
    'AsyncStorage is persistent local storage, not encrypted storage.',
    'Currency changes the displayed symbol; it never converts the entered amount.',
    'Picked images stay as local URI references and appear in the editor, not on list cards.',
    'Clearing native app data or browser site storage removes wishes and preferences.',
  ] as const;

  protected readonly routeNotes = [
    {
      path: 'app/index.tsx',
      label: 'Wishlist',
      detail:
        'Filters the shared collection to open wishes, owns the create/edit sheet, and exposes the floating add action.',
    },
    {
      path: 'app/completed.tsx',
      label: 'Done',
      detail:
        'Filters the same collection to completed wishes, then offers restore or permanent delete.',
    },
    {
      path: 'app/settings.tsx',
      label: 'Settings',
      detail: 'Writes currency and theme preferences through their dedicated contexts.',
    },
  ] as const;

  protected readonly storageKeys = [
    {
      key: '@wishlist',
      owner: 'WishContext',
      payload: 'JSON-serialized Wish[]',
    },
    {
      key: '@wishlist-currency',
      owner: 'CurrencyContext',
      payload: 'USD | RUB | AMD | EUR',
    },
    {
      key: '@wishlist-theme',
      owner: 'ThemeContext',
      payload: 'light | dark | system',
    },
  ] as const;

  protected readonly lifecycle = [
    {
      step: '01',
      title: 'Hydrate',
      detail:
        'WishProvider starts in a loading state, reads @wishlist once, then exposes the parsed collection to both list routes.',
    },
    {
      step: '02',
      title: 'Create',
      detail:
        'A trimmed input becomes a Wish with a generated ID, completed: false, and matching ISO createdAt / updatedAt timestamps. New wishes are prepended.',
    },
    {
      step: '03',
      title: 'Edit or complete',
      detail:
        'Updates map over the collection immutably. Editing merges new input; completing flips the boolean. Both refresh updatedAt.',
    },
    {
      step: '04',
      title: 'Restore or delete',
      detail:
        'Restore sets completed back to false and refreshes updatedAt. Delete filters the record out of the collection permanently.',
    },
    {
      step: '05',
      title: 'Persist',
      detail:
        'Every collection change updates React state and starts an AsyncStorage write of the complete array.',
    },
  ] as const;

  protected readonly duplicateRules = [
    'Whitespace is trimmed. A missing scheme is temporarily treated as https:// for comparison.',
    'The hostname is lowercased; a trailing path slash and URL fragment do not affect the match.',
    'Port, path, and query string remain significant. Query parameter order is not rewritten.',
    'The wish currently being edited is excluded, but completed wishes are still checked.',
    'A match produces a warning, not a hard constraint: “Save anyway” remains available.',
  ] as const;

  protected readonly currencies = [
    { code: 'USD', label: 'Dollars', symbol: '$' },
    { code: 'RUB', label: 'Rubles', symbol: '₽' },
    { code: 'AMD', label: 'Drams', symbol: '֏' },
    { code: 'EUR', label: 'Euros', symbol: '€' },
  ] as const;

  protected readonly themes = [
    {
      name: 'Light',
      detail: 'Forces NativeWind’s light color scheme.',
    },
    {
      name: 'Dark',
      detail: 'Forces NativeWind’s dark color scheme.',
    },
    {
      name: 'System',
      detail:
        'Reads React Native Appearance and follows later operating-system color-scheme changes.',
    },
  ] as const;

  protected readonly exactScripts = [
    { command: 'pnpm start', result: 'expo start' },
    { command: 'pnpm dev', result: 'expo start --tunnel' },
    { command: 'pnpm android', result: 'expo start --android' },
    { command: 'pnpm ios', result: 'expo start --ios' },
    { command: 'pnpm web', result: 'expo start --web' },
    { command: 'pnpm lint', result: 'expo lint' },
    {
      command: 'pnpm exec tsc --noEmit',
      result: 'Type-check without emitting files',
    },
  ] as const;

  protected readonly designDecisions = [
    {
      title: 'Use code styling for technical content',
      detail:
        'The dark canvas nods to the reference site. Monospace and framed panels appear around actual code and architecture instead of every section.',
    },
    {
      title: 'Use mint for links and focus',
      detail:
        'Mint marks links, focus rings, and a few structural details. Everything else stays neutral.',
    },
    {
      title: 'Show code from the current repository',
      detail:
        'Architecture, schema, and commands explain the current repository without implying that Wishlist is a hosted service.',
    },
    {
      title: 'Make implementation notes easy to scan',
      detail:
        'The contents rail, short sections, semantic headings, and open spacing make long implementation notes easier to scan.',
    },
    {
      title: 'Support keyboard and reduced motion',
      detail:
        'Controls have visible focus rings and large touch targets. Copy feedback is announced, and reduced-motion preferences stop decorative movement.',
    },
  ] as const;

  protected readonly maintenanceNotes = [
    {
      label: 'Schema',
      detail:
        'Wish[] is parsed directly with no runtime validation, schema version, or migration layer. A field change should ship with a migration before existing data is assumed compatible.',
    },
    {
      label: 'Storage errors',
      detail:
        'Wish hydration and writes do not currently surface failures in the interface. Currency writes are caught silently; theme persistence is also not reported to the user.',
    },
    {
      label: 'Links',
      detail:
        'Normalization is only used to find duplicates. The saved value is still the user’s trimmed input and is passed to Expo WebBrowser without a validation step.',
    },
    {
      label: 'Images',
      detail:
        'Only a picker-returned URI is persisted. If files move, permissions change, or browser storage is cleared, the reference may no longer resolve.',
    },
    {
      label: 'Manifest scripts',
      detail:
        'package.json also declares reset-project, but its referenced scripts/reset-project.js file is absent in the current repository, so it is intentionally not presented as a runnable command.',
    },
    {
      label: 'Documentation',
      detail:
        'Keep version, platform, storage, and privacy statements tied to app.json, package.json, and the context implementations, not to planned distribution work.',
    },
  ] as const;

  protected readonly quickStart = `${siteLinks.cloneCommand}
cd wishlist

nvm install
nvm use

corepack enable
corepack prepare pnpm@11.13.0 --activate

pnpm install --frozen-lockfile
pnpm start`;

  protected readonly wishSchema = `export type Priority = "low" | "medium" | "high";

export interface Wish {
  id: string;
  title: string;
  price: string;
  imageUri: string;
  link: string;
  notes: string;
  priority: Priority;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export type WishInput = Omit<
  Wish,
  "id" | "completed" | "createdAt" | "updatedAt"
>;`;

  protected readonly copyState = signal<CopyState>('idle');
  protected readonly copyButtonLabel = computed(() => {
    switch (this.copyState()) {
      case 'copying':
        return 'Copying…';
      case 'copied':
        return 'Copied';
      case 'failed':
        return 'Try again';
      default:
        return 'Copy setup';
    }
  });
  protected readonly copyFeedback = computed(() => {
    switch (this.copyState()) {
      case 'copying':
        return 'Copying the setup commands.';
      case 'copied':
        return 'Setup commands copied to the clipboard.';
      case 'failed':
        return 'Copy failed. Select the commands in the code window instead.';
      default:
        return 'Copies the complete setup sequence.';
    }
  });

  protected async copyQuickStart(): Promise<void> {
    this.copyState.set('copying');

    if (typeof navigator === 'undefined' || !navigator.clipboard) {
      this.copyState.set('failed');
      return;
    }

    try {
      await navigator.clipboard.writeText(this.quickStart);
      this.copyState.set('copied');
    } catch {
      this.copyState.set('failed');
    }
  }
}
