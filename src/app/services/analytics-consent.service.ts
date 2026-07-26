import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

type ConsentChoice = 'accepted' | 'rejected';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

@Injectable({ providedIn: 'root' })
export class AnalyticsConsentService {
  private readonly measurementId = 'G-ZR4V3V4T53';
  private readonly storageKey = 'analytics-consent';
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private analyticsLoaded = false;

  readonly choice = signal<ConsentChoice | null>(null);
  readonly settingsOpen = signal(false);

  constructor() {
    if (!this.isBrowser) return;

    const savedChoice = localStorage.getItem(this.storageKey);
    if (savedChoice === 'accepted' || savedChoice === 'rejected') {
      this.choice.set(savedChoice);
    }

    if (savedChoice === 'accepted') {
      this.loadAnalytics();
    }

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(event => {
        if (this.analyticsLoaded) this.trackPageView(event.urlAfterRedirects);
      });
  }

  accept(): void {
    if (!this.isBrowser) return;
    localStorage.setItem(this.storageKey, 'accepted');
    this.choice.set('accepted');
    this.settingsOpen.set(false);
    this.loadAnalytics();
  }

  reject(): void {
    if (!this.isBrowser) return;
    localStorage.setItem(this.storageKey, 'rejected');
    this.choice.set('rejected');
    this.settingsOpen.set(false);
    this.disableAnalytics();
  }

  openSettings(): void {
    this.settingsOpen.set(true);
  }

  closeSettings(): void {
    this.settingsOpen.set(false);
  }

  private loadAnalytics(): void {
    if (this.analyticsLoaded) return;

    (window as unknown as Record<string, boolean>)[`ga-disable-${this.measurementId}`] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag =
      window.gtag ||
      function (...args: unknown[]) {
        window.dataLayer.push(args);
      };
    window.gtag('js', new Date());
    window.gtag('config', this.measurementId, { send_page_view: false });

    const script = this.document.createElement('script');
    script.id = 'google-analytics';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.measurementId}`;
    this.document.head.appendChild(script);

    this.analyticsLoaded = true;
    this.trackPageView(this.router.url);
  }

  private trackPageView(url: string): void {
    window.gtag('event', 'page_view', {
      page_location: window.location.href,
      page_path: url,
      page_title: this.document.title,
    });
  }

  private disableAnalytics(): void {
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
      });
    }

    (window as unknown as Record<string, boolean>)[`ga-disable-${this.measurementId}`] = true;
    this.document.getElementById('google-analytics')?.remove();
    this.deleteAnalyticsCookies();
    this.analyticsLoaded = false;
  }

  private deleteAnalyticsCookies(): void {
    const hostnameParts = window.location.hostname.split('.');
    const domains = ['', window.location.hostname];

    for (let index = 0; index < hostnameParts.length - 1; index++) {
      domains.push(`.${hostnameParts.slice(index).join('.')}`);
    }

    for (const cookie of this.document.cookie.split(';')) {
      const name = cookie.split('=')[0].trim();
      if (name === '_ga' || name.startsWith('_ga_')) {
        for (const domain of domains) {
          const domainPart = domain ? `; domain=${domain}` : '';
          this.document.cookie = `${name}=; Max-Age=0; path=/${domainPart}; SameSite=Lax`;
        }
      }
    }
  }
}
