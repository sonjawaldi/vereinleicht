import { DOCUMENT } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  Output,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-offer-dialog',
  standalone: true,
  imports: [RouterLink],
  template: `
    @if (dialogOpen) {
      <div
        class="offer-backdrop fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/70 backdrop-blur-sm"
        role="presentation"
        (mousedown)="closeFromBackdrop($event)"
      >
        <section
          id="website-offer-dialog"
          class="offer-dialog relative w-full max-w-xl overflow-hidden bg-white text-gray-900 shadow-2xl dark:bg-gray-950 dark:text-white"
          role="dialog"
          aria-modal="true"
          aria-labelledby="website-offer-title"
          aria-describedby="website-offer-description"
          (mousedown)="$event.stopPropagation()"
          (keydown.tab)="trapFocus($event)"
        >
          <button
            type="button"
            class="offer-close absolute flex items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300 dark:bg-white/10 dark:text-gray-300 dark:hover:bg-white/15"
            aria-label="Angebot schließen"
            (click)="closeDialog()"
          >
            &times;
          </button>

          <div
            class="offer-label inline-flex items-center gap-2 rounded-full bg-emerald-100 font-black uppercase tracking-[0.16em] text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
          >
            <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
            Kennenlernangebot
          </div>

          <h2
            id="website-offer-title"
            class="offer-title max-w-md font-black leading-tight tracking-tight"
          >
            {{ title }}
          </h2>
          <p
            id="website-offer-description"
            class="offer-description leading-relaxed text-gray-600 dark:text-gray-300"
          >
            {{ description }}
          </p>

          <div
            class="offer-conditions rounded-2xl border border-emerald-100 bg-emerald-50/70 dark:border-emerald-900/50 dark:bg-emerald-950/30"
          >
            <h3
              class="text-sm font-black uppercase tracking-[0.12em] text-emerald-800 dark:text-emerald-300"
            >
              Bedingungen
            </h3>
            <ul class="offer-list">
              @for (condition of conditions; track condition) {
                <li class="offer-condition flex leading-relaxed text-gray-700 dark:text-gray-200">
                  <span
                    class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-xs font-bold text-white"
                    aria-hidden="true"
                    >✓</span
                  >
                  <span>{{ condition }}</span>
                </li>
              }
            </ul>
          </div>

          <p
            class="offer-availability text-center font-bold text-emerald-700 dark:text-emerald-300"
          >
            {{ availability }}
          </p>

          @if (audience === 'portal') {
            <div class="offer-button grid gap-3 sm:grid-cols-2">
              <a
                routerLink="/verein"
                class="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-emerald-700 px-5 font-bold text-white shadow-lg shadow-emerald-900/25 transition-all hover:-translate-y-0.5 hover:bg-emerald-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300"
                (click)="closeDialog()"
              >
                Angebot für Vereine <span aria-hidden="true">→</span>
              </a>
              <a
                routerLink="/business"
                class="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-teal-700 px-5 font-bold text-white shadow-lg shadow-teal-900/25 transition-all hover:-translate-y-0.5 hover:bg-teal-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-300"
                (click)="closeDialog()"
              >
                Angebot für Business <span aria-hidden="true">→</span>
              </a>
            </div>
          } @else {
            <button
              type="button"
              class="offer-button inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-700 px-6 font-bold text-white shadow-lg shadow-emerald-900/25 transition-all hover:-translate-y-0.5 hover:bg-emerald-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300"
              (click)="makeAppointment()"
            >
              Jetzt unverbindlich Termin sichern <span aria-hidden="true">→</span>
            </button>
          }
        </section>
      </div>
    } @else {
      <button
        type="button"
        class="offer-reopen fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full border-2 border-amber-300 bg-yellow-300 text-2xl text-amber-950 shadow-lg shadow-amber-500/30 transition-all hover:-translate-y-1 hover:scale-105 hover:bg-yellow-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-300 sm:bottom-7 sm:right-7 sm:h-16 sm:w-16 sm:text-3xl"
        aria-label="Kennenlernangebot erneut öffnen"
        aria-controls="website-offer-dialog"
        (click)="openDialog()"
      >
        <span aria-hidden="true">★</span>
      </button>
    }
  `,
  styles: `
    .offer-backdrop {
      padding: clamp(0.5rem, 2.5dvh, 1rem);
    }

    .offer-dialog {
      max-height: calc(100dvh - clamp(1rem, 5dvh, 2rem));
      border-radius: clamp(1.25rem, 4dvh, 2rem);
      padding: clamp(1.1rem, 4dvh, 2.25rem);
    }

    .offer-close {
      right: clamp(0.7rem, 2dvh, 1rem);
      top: clamp(0.7rem, 2dvh, 1rem);
      width: clamp(2rem, 5.5dvh, 2.5rem);
      height: clamp(2rem, 5.5dvh, 2.5rem);
      font-size: clamp(1.25rem, 3dvh, 1.5rem);
    }

    .offer-label {
      padding: clamp(0.25rem, 0.8dvh, 0.375rem) 0.75rem;
      font-size: clamp(0.6rem, 1.6dvh, 0.75rem);
    }

    .offer-title {
      margin-top: clamp(0.65rem, 2.2dvh, 1.25rem);
      font-size: clamp(1.5rem, 5dvh, 2.25rem);
    }

    .offer-description {
      margin-top: clamp(0.45rem, 1.7dvh, 1rem);
      font-size: clamp(0.75rem, 2dvh, 1rem);
    }

    .offer-conditions {
      margin-top: clamp(0.65rem, 2.5dvh, 1.5rem);
      padding: clamp(0.75rem, 2.5dvh, 1.25rem);
    }

    .offer-list {
      margin-top: clamp(0.45rem, 1.5dvh, 1rem);
      display: grid;
      gap: clamp(0.3rem, 1.2dvh, 0.75rem);
    }

    .offer-condition {
      gap: clamp(0.5rem, 1.5dvh, 0.75rem);
      font-size: clamp(0.7rem, 1.8dvh, 0.875rem);
    }

    .offer-button {
      margin-top: clamp(0.4rem, 1.5dvh, 0.85rem);
      min-height: clamp(2.5rem, 7dvh, 3.5rem);
      font-size: clamp(0.8rem, 2dvh, 1rem);
    }

    .offer-availability {
      margin-top: clamp(0.45rem, 1.5dvh, 0.9rem);
      font-size: clamp(0.7rem, 1.8dvh, 0.875rem);
    }

    .offer-reopen {
      animation: offer-star-entrance 260ms ease-out;
    }

    @keyframes offer-star-entrance {
      from {
        opacity: 0;
        transform: scale(0.75) rotate(-18deg);
      }

      to {
        opacity: 1;
        transform: scale(1) rotate(0);
      }
    }

    @media (max-height: 520px) {
      .offer-description {
        display: none;
      }

      .offer-conditions h3 {
        display: none;
      }

      .offer-list {
        margin-top: 0;
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }
  `,
})
export class HomeOfferDialogComponent implements OnDestroy {
  private readonly document = inject(DOCUMENT);

  @Input() audience: 'verein' | 'business' | 'portal' = 'verein';
  @Output() readonly appointmentRequested = new EventEmitter<void>();

  readonly conditions = [
    'Es handelt sich um eine einmalige, kostenlose Erstellung im Rahmen meiner Portfolio-Aktion.',
    'Auf der Website wird dezent im Footer darauf hingewiesen, dass sie von mir erstellt wurde.',
    'Die Domain zahlen Sie selbst. Das Hosting übernehme ich auf Wunsch für 15 €/Monat.',
    'Texte, Bilder und Logo liefern Sie innerhalb von 3 Wochen.',
    'Ausgenommen sind größere Organisationen und Verbände sowie Webseiten mit hohem Funktions- oder Verwaltungsaufwand.',
    'Maximal 5 Seiten. Individuelle Funktionen wie Mitgliederverwaltung, Portale oder Buchungssysteme sind nicht enthalten.',
  ];

  dialogOpen = true;

  get title(): string {
    if (this.audience === 'business') {
      return 'Für die nächsten 3 Unternehmen erstelle ich die Website kostenlos.';
    }

    if (this.audience === 'portal') {
      return 'Für je 3 Vereine und Unternehmen erstelle ich die Website kostenlos.';
    }

    return 'Für die nächsten 3 Vereine erstelle ich die Website kostenlos.';
  }

  get availability(): string {
    if (this.audience === 'business') {
      return 'Noch 2 von 3 Plätzen für Unternehmen frei.';
    }

    if (this.audience === 'portal') {
      return 'Plätze für Vereine und Unternehmen werden getrennt vergeben.';
    }

    return 'Noch 2 von 3 Plätzen für Vereine frei.';
  }

  get description(): string {
    if (this.audience === 'business') {
      return 'Damit Ihr Unternehmen online professionell sichtbar wird und neue Kundinnen und Kunden erreicht. Ich gestalte Ihnen eine moderne, mobil optimierte Website, mit der Sie bei Google gefunden werden. Für die nächsten drei Unternehmen kostenlos.';
    }

    if (this.audience === 'portal') {
      return 'Ich gestalte eine moderne, mobil optimierte Website, mit der Sie bei Google sichtbar werden. Für je drei Vereine und Unternehmen kostenlos. Wählen Sie den passenden Bereich aus.';
    }

    return 'Damit Ihr Verein online von neuen Mitgliedern, Besuchern und Unterstützern gefunden wird. Ich gestalte Ihnen eine moderne, mobil optimierte Website, mit der Sie bei Google sichtbar werden. Für die nächsten drei Vereine kostenlos.';
  }

  constructor() {
    this.document.body.style.overflow = 'hidden';
  }

  closeDialog(): void {
    this.dialogOpen = false;
    this.document.body.style.overflow = '';
  }

  openDialog(): void {
    this.dialogOpen = true;
    this.document.body.style.overflow = 'hidden';
  }

  makeAppointment(): void {
    this.closeDialog();
    this.appointmentRequested.emit();
  }

  closeFromBackdrop(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.closeDialog();
    }
  }

  trapFocus(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    const dialog = this.document.getElementById('website-offer-dialog');
    const focusableElements = dialog?.querySelectorAll<HTMLElement>(
      'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
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
