import { DOCUMENT } from '@angular/common';
import { Component, HostListener, OnDestroy, computed, inject } from '@angular/core';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { LanguageService } from '../../services/language.service';
import { CONTACT_FORM_ENABLED } from '../../config/feature-flags';
import { createContactMailto } from '../../utils/contact-mailto';
import type { ContactPrefill } from './home-challenges.component';

@Component({
  selector: 'app-home-contact',
  standalone: true,
  imports: [ContactFormComponent],
  template: `
    <section id="contact" class="club-section py-16 transition-colors duration-300 md:py-20">
      <div class="container mx-auto px-6 sm:px-12 lg:px-20">
        <div
          class="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-green-700 via-emerald-800 to-teal-900 shadow-[0_24px_70px_rgba(20,83,45,0.25)] dark:from-green-950 dark:via-emerald-950 dark:to-teal-950"
        >
          <div class="relative z-10 grid lg:grid-cols-[1.15fr_0.85fr]">
            <div class="p-7 text-white sm:p-10 lg:p-12">
              <div
                class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-100"
              >
                <span class="h-1.5 w-1.5 rounded-full bg-emerald-300"></span>Bereit für Ihre Idee
              </div>
              <h2
                class="mt-5 max-w-xl text-3xl font-black leading-tight tracking-tight md:text-4xl"
              >
                Machen wir Ihren Verein digital stärker.
              </h2>
              <p class="mt-4 max-w-xl text-sm leading-relaxed text-emerald-50 md:text-base">
                Sie haben eine Idee, ein konkretes Problem oder wissen noch nicht genau, wo Sie
                anfangen sollen? Schreiben Sie mir – wir finden gemeinsam den passenden nächsten
                Schritt.
              </p>
              <ul
                class="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3"
                aria-label="Vorteile der Kontaktaufnahme"
              >
                @for (benefit of benefits; track benefit) {
                  <li class="flex items-center gap-2 text-xs font-bold text-white/90">
                    <span
                      class="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-emerald-300"
                      >✓</span
                    >{{ benefit }}
                  </li>
                }
              </ul>
            </div>
            <div
              class="m-3 mt-0 flex flex-col justify-center rounded-[1.5rem] bg-white p-6 text-gray-900 shadow-2xl dark:bg-gray-950 dark:text-white sm:p-8 lg:ml-0 lg:mt-3"
            >
              <span
                class="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300"
                >Direkter Kontakt</span
              >
              <h3 class="mt-3 text-xl font-black tracking-tight">
                Erzählen Sie mir von Ihrem Projekt.
              </h3>
              <p class="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                @if (contactFormEnabled) {
                  Öffnen Sie das Kontaktformular und senden Sie mir Ihre Anfrage in wenigen
                  Schritten.
                } @else {
                  Schreiben Sie mir Ihre Anfrage direkt per E-Mail.
                }
              </p>
              @if (contactFormEnabled) {
                <button
                  type="button"
                  class="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-700 px-6 py-4 font-bold text-white shadow-lg shadow-emerald-900/20 transition-all hover:-translate-y-0.5 hover:bg-emerald-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300"
                  (click)="showForm()"
                >
                  Kontakt aufnehmen <span aria-hidden="true">→</span>
                </button>
              }
              <a
                [href]="contactMailto()"
                class="mt-6 text-center text-sm font-semibold text-emerald-700 underline decoration-emerald-300 underline-offset-4 dark:text-emerald-400"
                >Direkt per E-Mail schreiben</a
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    @if (contactFormEnabled && dialogOpen) {
      <div
        class="fixed inset-0 z-[100] flex items-center justify-center bg-gray-950/70 p-2 backdrop-blur-sm sm:p-4 lg:p-6"
        role="presentation"
        (mousedown)="closeFromBackdrop($event)"
      >
        <section
          id="contact-form-dialog"
          class="relative max-h-[calc(100dvh-1rem)] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-4 text-gray-900 shadow-2xl dark:bg-gray-950 dark:text-white sm:max-h-[calc(100dvh-2rem)] sm:rounded-3xl sm:p-6 lg:p-7"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-form-dialog-title"
          (mousedown)="$event.stopPropagation()"
          (keydown.tab)="trapFocus($event)"
        >
          <button
            type="button"
            class="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-xl text-gray-600 transition-colors hover:bg-gray-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300 dark:bg-white/10 dark:text-gray-300 dark:hover:bg-white/15 sm:right-4 sm:top-4 sm:h-10 sm:w-10 sm:text-2xl"
            aria-label="Kontaktformular schließen"
            (click)="closeDialog()"
          >
            &times;
          </button>
          <h2 id="contact-form-dialog-title" class="sr-only">Kontakt aufnehmen</h2>
          <app-contact-form [prefill]="formPrefill.message" />
        </section>
      </div>
    }
  `,
})
export class HomeContactComponent implements OnDestroy {
  private readonly document = inject(DOCUMENT);
  private readonly language = inject(LanguageService);
  readonly contactFormEnabled = CONTACT_FORM_ENABLED;
  readonly contactMailto = computed(() => createContactMailto(this.language.language()));
  private previouslyFocusedElement: HTMLElement | null = null;
  readonly benefits = ['Unverbindlich', 'Persönlich', 'Verständlich'];
  dialogOpen = false;
  formPrefill: ContactPrefill = { subject: 'Neue Kontaktanfrage über die Website', message: '' };

  showForm(prefill?: ContactPrefill): void {
    if (!this.contactFormEnabled) return;

    this.formPrefill = prefill ?? {
      subject: 'Neue Kontaktanfrage über die Website',
      message: '',
    };
    this.previouslyFocusedElement = this.document.activeElement as HTMLElement | null;
    this.dialogOpen = true;
    this.document.body.style.overflow = 'hidden';
    setTimeout(() => {
      this.document
        .querySelector<HTMLButtonElement>('[aria-label="Kontaktformular schließen"]')
        ?.focus();
    });
  }

  closeDialog(): void {
    this.dialogOpen = false;
    this.document.body.style.overflow = '';
    setTimeout(() => this.previouslyFocusedElement?.focus());
  }

  closeFromBackdrop(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.closeDialog();
    }
  }

  trapFocus(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    const dialog = this.document.getElementById('contact-form-dialog');
    const focusableElements = dialog?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );

    if (!focusableElements?.length) return;

    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];
    if (keyboardEvent.shiftKey && this.document.activeElement === first) {
      keyboardEvent.preventDefault();
      last.focus();
    } else if (!keyboardEvent.shiftKey && this.document.activeElement === last) {
      keyboardEvent.preventDefault();
      first.focus();
    }
  }

  @HostListener('document:keydown.escape')
  closeOnEscape(): void {
    if (this.dialogOpen) {
      this.closeDialog();
    }
  }

  ngOnDestroy(): void {
    this.document.body.style.overflow = '';
  }
}
