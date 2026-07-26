import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';

export type Language = 'de' | 'en';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  readonly language = signal<Language>('de');

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem('language');
      if (saved === 'de' || saved === 'en') this.language.set(saved);
    }
    this.updateDocument();
  }

  setLanguage(language: Language): void {
    this.language.set(language);
    if (isPlatformBrowser(this.platformId)) localStorage.setItem('language', language);
    this.updateDocument();
  }

  toggle(): void {
    this.setLanguage(this.language() === 'de' ? 'en' : 'de');
  }

  private updateDocument(): void {
    this.document.documentElement.lang = this.language();
  }
}
