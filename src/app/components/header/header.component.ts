import { Component, ElementRef, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Input() area: 'verein' | 'business' = 'verein';
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  themeService = inject(ThemeService);
  languageService = inject(LanguageService);
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenus(fragment?: string): void {
    this.isMenuOpen = false;
    this.elementRef.nativeElement.querySelectorAll('details[open]').forEach((menu: Element) => {
      menu.removeAttribute('open');
    });

    if (!fragment || typeof document === 'undefined') {
      return;
    }

    const scrollToTarget = (): void => {
      const target = document.getElementById(fragment);
      if (!target) {
        return;
      }

      const headerHeight = this.elementRef.nativeElement.querySelector('header')?.offsetHeight ?? 0;
      const availableHeight = window.innerHeight - headerHeight;
      const equalGap = Math.max(0, (availableHeight - target.offsetHeight) / 2);
      const targetTop = target.getBoundingClientRect().top + window.scrollY;
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      window.scrollTo({
        top: Math.max(0, targetTop - headerHeight - equalGap),
        behavior: reducedMotion ? 'auto' : 'smooth',
      });
    };

    window.setTimeout(scrollToTarget, 0);
    window.setTimeout(scrollToTarget, 150);
  }
}
