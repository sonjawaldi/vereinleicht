import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, computed, inject, output, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { BookingService } from '../../services/booking.service';
import { describeFormError } from '../../services/contact.service';
import { LanguageService } from '../../services/language.service';

interface BookingDay {
  key: string;
  label: string;
  slots: { start: string; time: string }[];
}

const TIME_ZONE = 'Europe/Berlin';

function groupByDay(slots: string[], locale: string): BookingDay[] {
  const keyFormat = new Intl.DateTimeFormat('en-CA', { timeZone: TIME_ZONE });
  const dayFormat = new Intl.DateTimeFormat(locale, {
    timeZone: TIME_ZONE,
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
  const timeFormat = new Intl.DateTimeFormat(locale, {
    timeZone: TIME_ZONE,
    hour: '2-digit',
    minute: '2-digit',
  });

  const days = new Map<string, BookingDay>();
  for (const start of slots) {
    const date = new Date(start);
    const key = keyFormat.format(date);
    if (!days.has(key)) days.set(key, { key, label: dayFormat.format(date), slots: [] });
    days.get(key)!.slots.push({ start, time: timeFormat.format(date) });
  }
  return [...days.values()];
}

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './booking.component.html',
})
export class BookingComponent implements OnInit {
  private readonly bookingService = inject(BookingService);
  private readonly language = inject(LanguageService);

  /** Führt zum Nachrichtenformular, wenn kein Termin passt oder der Kalender nicht antwortet. */
  readonly switchToMessage = output<void>();

  readonly state = signal<'loading' | 'ready' | 'failed' | 'sent'>('loading');
  readonly slots = signal<string[]>([]);
  readonly slotMinutes = signal(30);
  readonly dayKey = signal<string | null>(null);
  readonly start = signal<string | null>(null);

  readonly days = computed(() =>
    groupByDay(this.slots(), this.language.language() === 'en' ? 'en-GB' : 'de-DE'),
  );
  readonly selectedDay = computed(() => this.days().find(day => day.key === this.dayKey()));
  readonly selectedLabel = computed(() => {
    const day = this.selectedDay();
    const slot = day?.slots.find(candidate => candidate.start === this.start());
    if (!day || !slot) return '';
    return this.language.language() === 'en'
      ? `${day.label}, ${slot.time}`
      : `${day.label}, ${slot.time} Uhr`;
  });

  name = '';
  email = '';
  organization = '';
  note = '';
  /** Honeypot – für Menschen unsichtbar, Bots füllen ihn aus. */
  website = '';

  readonly sending = signal(false);
  readonly errorMessage = signal('');
  readonly fieldErrors = signal<Record<string, string>>({});

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.state.set('loading');
    this.bookingService.loadSlots().subscribe({
      next: response => {
        this.slots.set(response.slots);
        this.slotMinutes.set(response.slotMinutes);
        this.dayKey.set(this.days()[0]?.key ?? null);
        this.start.set(null);
        this.state.set('ready');
      },
      error: () => this.state.set('failed'),
    });
  }

  chooseDay(key: string): void {
    this.dayKey.set(key);
    this.start.set(null);
  }

  submit(form: NgForm): void {
    if (this.sending()) return;

    const clientErrors: Record<string, string> = {};
    if (form.controls['name']?.errors) {
      clientErrors['name'] = 'Bitte einen Namen mit mindestens 2 Zeichen angeben.';
    }
    if (form.controls['email']?.errors) {
      clientErrors['email'] = 'Bitte eine gültige E-Mail-Adresse angeben.';
    }
    if (Object.keys(clientErrors).length > 0) {
      this.fieldErrors.set(clientErrors);
      this.errorMessage.set('Bitte prüft die markierten Felder.');
      return;
    }

    const start = this.start();
    if (!start) return;

    this.sending.set(true);
    this.errorMessage.set('');
    this.fieldErrors.set({});

    this.bookingService
      .book({
        name: this.name,
        email: this.email,
        start,
        organization: this.organization,
        message: this.note,
        website: this.website,
      })
      .subscribe({
        next: () => {
          this.sending.set(false);
          this.state.set('sent');
        },
        error: (error: HttpErrorResponse) => {
          this.sending.set(false);
          if (error.status === 409) {
            // Der Termin ist weg, die eingegebenen Daten bleiben stehen.
            this.errorMessage.set(
              'Dieser Termin wurde gerade vergeben. Bitte wählt einen anderen.',
            );
            this.load();
            return;
          }
          const described = describeFormError(error);
          this.errorMessage.set(described.message);
          this.fieldErrors.set(described.fieldErrors);
        },
      });
  }

  restart(): void {
    this.name = '';
    this.email = '';
    this.organization = '';
    this.note = '';
    this.website = '';
    this.errorMessage.set('');
    this.load();
  }
}
