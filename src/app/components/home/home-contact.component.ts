import { DOCUMENT } from '@angular/common';
import { Component, HostListener, OnDestroy, computed, inject } from '@angular/core';
import { BookingComponent } from '../booking/booking.component';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { LanguageService } from '../../services/language.service';
import { CONTACT_FORM_ENABLED } from '../../config/feature-flags';
import { createContactMailto } from '../../utils/contact-mailto';
import type { ContactPrefill } from './home-challenges.component';

@Component({
  selector: 'app-home-contact',
  standalone: true,
  imports: [BookingComponent, ContactFormComponent],
  template: `
    <section id="contact" class="vl-section">
      <div class="vl-wrap contact">
        <div class="contact__main">
          <span class="vl-kicker">Bereit für eure Idee?</span>
          <h2 class="vl-h2">Lasst uns euren Verein digital stärker machen.</h2>
          <p class="vl-lead">
            Ihr habt eine Idee, ein konkretes Problem oder wisst noch nicht, wo ihr anfangen sollt?
            Schreibt mir einfach – wir finden gemeinsam den passenden nächsten Schritt.
          </p>
          <div class="contact__actions">
            @if (contactFormEnabled) {
              <button type="button" class="vl-btn vl-btn--primary" (click)="showForm()">
                Kontakt aufnehmen
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6"></path>
                </svg>
              </button>
              <button type="button" class="vl-btn vl-btn--secondary" (click)="showBooking()">
                Kennenlernen buchen
              </button>
            }
            <a [href]="contactMailto()" class="vl-btn vl-btn--secondary">Direkt per E-Mail</a>
          </div>
        </div>
        <div class="chat" role="group" aria-label="Beispiel-Unterhaltung">
          <span class="chat__who"><b aria-hidden="true">V</b>Euer Verein</span>
          <p class="chat__msg">
            Hallo Sonja, unsere Website ist ziemlich alt. Wo fangen wir am besten an?
          </p>
          <p class="chat__msg chat__msg--me">
            Hallo ihr! Am besten mit einem kurzen Kennenlernen – unverbindlich, persönlich und
            verständlich.
          </p>
          <span class="chat__who chat__who--me">Sonja<b aria-hidden="true">SW</b></span>
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
          class="relative max-h-[calc(100dvh-1rem)] w-full max-w-xl overflow-y-auto rounded-2xl bg-vl-surface p-4 text-vl-heading shadow-2xl sm:max-h-[calc(100dvh-2rem)] sm:rounded-3xl sm:p-6 lg:p-7"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-form-dialog-title"
          (mousedown)="$event.stopPropagation()"
          (keydown.tab)="trapFocus($event)"
        >
          <button
            type="button"
            class="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[var(--sand)] text-xl text-vl-heading sm:right-4 sm:top-4 sm:h-10 sm:w-10 sm:text-2xl"
            aria-label="Kontaktformular schließen"
            (click)="closeDialog()"
          >
            &times;
          </button>
          <h2 id="contact-form-dialog-title" class="sr-only">Kontakt aufnehmen</h2>
          <div
            class="mb-4 mr-12 grid grid-cols-2 gap-1 rounded-full bg-[var(--sand)] p-1 sm:mb-5"
            role="group"
            aria-label="Art der Kontaktaufnahme"
          >
            <button
              type="button"
              class="whitespace-nowrap rounded-full px-2 py-2 text-[13px] font-bold transition sm:px-3 sm:text-sm"
              [class]="
                dialogMode === 'message'
                  ? 'bg-vl-surface text-vl-heading shadow-sm'
                  : 'text-vl-muted hover:text-vl-heading'
              "
              [attr.aria-pressed]="dialogMode === 'message'"
              (click)="dialogMode = 'message'"
            >
              Nachricht schreiben
            </button>
            <button
              type="button"
              class="whitespace-nowrap rounded-full px-2 py-2 text-[13px] font-bold transition sm:px-3 sm:text-sm"
              [class]="
                dialogMode === 'booking'
                  ? 'bg-vl-surface text-vl-heading shadow-sm'
                  : 'text-vl-muted hover:text-vl-heading'
              "
              [attr.aria-pressed]="dialogMode === 'booking'"
              (click)="dialogMode = 'booking'"
            >
              Termin buchen
            </button>
          </div>
          @if (dialogMode === 'booking') {
            <app-booking (switchToMessage)="dialogMode = 'message'" />
          } @else {
            <app-contact-form [prefill]="formPrefill.message" />
          }
        </section>
      </div>
    }
  `,
  styles: `
    .contact {
      display: grid;
      grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
      align-items: center;
      gap: 56px;
      border: 1.5px solid var(--border);
      border-radius: 40px;
      background: var(--surface);
      padding: clamp(28px, 4.5vw, 64px);
    }

    .contact__main {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 20px;
    }

    .contact__actions {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 14px;
    }

    .chat {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .chat__msg {
      max-width: 340px;
      border-radius: 22px 22px 22px 6px;
      background: var(--sand);
      padding: 16px 20px;
      font-size: 16.5px;
      line-height: 1.55;
      color: var(--heading);
    }

    .chat__msg--me {
      align-self: flex-end;
      border-radius: 22px 22px 6px 22px;
      background: var(--primary);
      color: var(--on-primary);
    }

    .chat__who {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 14px;
      font-weight: 700;
      color: var(--muted);
    }

    .chat__who--me {
      align-self: flex-end;
    }

    .chat__who b {
      display: grid;
      width: 34px;
      height: 34px;
      place-items: center;
      border-radius: 50%;
      background: var(--peach);
      font-family: var(--font-serif);
      color: var(--heading);
    }

    @media (max-width: 960px) {
      .contact {
        grid-template-columns: minmax(0, 1fr);
        gap: 32px;
        border-radius: 30px;
      }
    }

    @media (max-width: 700px) {
      .contact__actions {
        flex-direction: column;
        align-self: stretch;
      }

      .contact__actions .vl-btn {
        width: 100%;
      }
    }
  `,
})
export class HomeContactComponent implements OnDestroy {
  private readonly document = inject(DOCUMENT);
  private readonly language = inject(LanguageService);
  readonly contactFormEnabled = CONTACT_FORM_ENABLED;
  readonly contactMailto = computed(() => createContactMailto(this.language.language()));
  private previouslyFocusedElement: HTMLElement | null = null;
  dialogOpen = false;
  dialogMode: 'message' | 'booking' = 'message';
  formPrefill: ContactPrefill = { subject: 'Neue Kontaktanfrage über die Website', message: '' };

  showForm(prefill?: ContactPrefill): void {
    if (!this.contactFormEnabled) return;

    this.formPrefill = prefill ?? {
      subject: 'Neue Kontaktanfrage über die Website',
      message: '',
    };
    this.openDialog('message');
  }

  /** Öffnet den Dialog direkt bei den freien Terminen. */
  showBooking(): void {
    if (!this.contactFormEnabled) return;

    this.formPrefill = { subject: 'Neue Kontaktanfrage über die Website', message: '' };
    this.openDialog('booking');
  }

  private openDialog(mode: 'message' | 'booking'): void {
    this.dialogMode = mode;
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
