import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  darkMode = signal<boolean>(
    typeof window !== 'undefined'
      ? localStorage.getItem('theme') === 'dark' ||
          (!localStorage.getItem('theme') &&
            window.matchMedia('(prefers-color-scheme: dark)').matches) ||
          !localStorage.getItem('theme')
      : true,
  );

  constructor() {
    effect(() => {
      if (typeof window !== 'undefined') {
        const isDark = this.darkMode();
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        if (isDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    });
  }

  toggleDarkMode() {
    this.darkMode.update(v => !v);
  }
}
