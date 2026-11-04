import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  darkMode = signal<boolean>(
    typeof window !== 'undefined'
      ? localStorage.getItem('theme') === 'dark' ||
          (!localStorage.getItem('theme') &&
            window.matchMedia('(prefers-color-scheme: dark)').matches)
      : false,
  );

  constructor() {
    effect(() => {
      if (typeof window !== 'undefined') {
        document.documentElement.classList.toggle('dark', this.darkMode());
      }
    });
  }

  /** Nur eine bewusste Wahl wird gespeichert, sonst gilt die Systemeinstellung. */
  toggleDarkMode() {
    this.darkMode.update(v => !v);
    localStorage.setItem('theme', this.darkMode() ? 'dark' : 'light');
  }
}
