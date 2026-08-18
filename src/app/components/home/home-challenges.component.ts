import { Component, computed, inject, output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CONTACT_FORM_ENABLED } from '../../config/feature-flags';
import { LanguageService } from '../../services/language.service';

export interface ContactPrefill {
  subject: string;
  message: string;
}

interface Challenge {
  id: string;
  label: string;
  response: string;
  topic: string;
  topicEn: string;
}

@Component({
  selector: 'app-home-challenges',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section id="challenges" class="club-section py-14 transition-colors duration-300 md:py-16">
      <div class="container mx-auto px-6 sm:px-12 lg:px-20">
        <header class="mx-auto max-w-3xl text-center">
          <span
            class="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300"
            >Herausforderungen im Vereinsalltag</span
          >
          <h2
            class="mt-2 text-2xl font-black tracking-tight text-gray-900 dark:text-white md:text-3xl"
          >
            Kommt Ihnen das bekannt vor?
          </h2>
          <p class="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300 md:text-base">
            Wählen Sie aus, was Ihren Vereinsalltag gerade beschäftigt.
          </p>
        </header>

        <div>
          <fieldset
            class="mx-auto mt-9 max-w-5xl divide-y divide-emerald-100 overflow-hidden rounded-3xl border border-emerald-200 bg-white/90 shadow-xl shadow-emerald-950/10 dark:divide-emerald-900/30 dark:border-emerald-900/60 dark:bg-emerald-950/15"
          >
            <legend class="sr-only">Typische Herausforderungen im Vereinsalltag auswählen</legend>
            @for (challenge of challenges; track challenge.id) {
              <label
                class="group flex cursor-pointer items-start gap-4 px-5 py-4 transition-colors hover:bg-emerald-50/60 has-[:checked]:bg-emerald-50 dark:hover:bg-emerald-950/20 dark:has-[:checked]:bg-emerald-950/30 sm:px-7 sm:py-5"
              >
                <input
                  type="checkbox"
                  name="challenge"
                  [value]="challenge.id"
                  [checked]="isSelected(challenge.id)"
                  (change)="toggle(challenge.id, $event)"
                  class="mt-0.5 h-6 w-6 shrink-0 cursor-pointer rounded-md border-2 border-emerald-300 text-emerald-600 shadow-sm focus:ring-emerald-500 dark:border-emerald-700 dark:bg-gray-950"
                />
                <span class="min-w-0">
                  <span
                    class="block text-sm font-semibold leading-relaxed text-gray-800 dark:text-gray-200 sm:text-base"
                    >{{ challenge.label }}</span
                  >
                  @if (isSelected(challenge.id)) {
                    <span
                      class="mt-2 block border-l-2 border-emerald-400 pl-3 text-sm leading-relaxed text-emerald-800 dark:text-emerald-300"
                      aria-live="polite"
                    >
                      {{ challenge.response }}
                    </span>
                  }
                </span>
              </label>
            }
          </fieldset>

          <a
            [routerLink]="['/']"
            fragment="contact"
            class="mx-auto mt-6 flex w-fit items-center justify-center rounded-2xl bg-emerald-700 px-7 py-3.5 font-bold text-white shadow-lg shadow-emerald-900/20 transition-all hover:-translate-y-0.5 hover:bg-emerald-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300"
          >
            Kontakt aufnehmen
            <span class="ml-2" aria-hidden="true">→</span>
          </a>
        </div>

        @if (selectedChallenges().length) {
          <div
            class="mx-auto mt-7 max-w-5xl rounded-3xl border border-emerald-200 bg-emerald-50 px-6 py-6 text-center dark:border-emerald-900 dark:bg-emerald-950/30 sm:px-8"
            aria-live="polite"
          >
            <p class="text-lg font-black text-gray-900 dark:text-white">
              Das klingt nach einem Projekt, bei dem ich Sie unterstützen kann.
            </p>
            <p
              class="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-gray-700 dark:text-gray-300"
            >
              Auf Basis Ihrer Auswahl können wir uns gemeinsam {{ topicSummary() }} ansehen.
            </p>
            @if (contactFormEnabled) {
              <button
                type="button"
                class="mt-5 inline-flex items-center justify-center rounded-2xl bg-emerald-700 px-7 py-3.5 font-bold text-white shadow-lg shadow-emerald-900/20 transition-all hover:-translate-y-0.5 hover:bg-emerald-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300"
                (click)="openContactForm()"
              >
                Projekt besprechen <span class="ml-2" aria-hidden="true">→</span>
              </button>
            }
          </div>
        }

        <div
          class="mx-auto mt-8 max-w-5xl rounded-2xl border border-emerald-100 bg-emerald-50/70 px-6 py-5 text-center dark:border-emerald-950 dark:bg-emerald-950/25"
        >
          <p
            class="text-sm font-semibold leading-relaxed text-gray-800 dark:text-gray-200 md:text-base"
          >
            Ich kenne diese Herausforderungen aus eigener Erfahrung und entwickle Lösungen, die dazu
            passen:
            <span class="text-emerald-700 dark:text-emerald-400"
              >bezahlbar, einfach zu pflegen und langfristig tragfähig.</span
            >
          </p>
        </div>
      </div>
    </section>
  `,
})
export class HomeChallengesComponent {
  private readonly language = inject(LanguageService);
  readonly contactFormRequested = output<ContactPrefill>();
  readonly contactFormEnabled = CONTACT_FORM_ENABLED;
  readonly selectedIds = signal<string[]>([]);
  readonly challenges: Challenge[] = [
    {
      id: 'website',
      label:
        'Unsere Website ist seit Jahren nicht aktualisiert und funktioniert auf dem Smartphone nur eingeschränkt.',
      response:
        'Dann schauen wir uns gemeinsam an, was bleiben kann und wo eine Modernisierung sinnvoll ist.',
      topic: 'die Modernisierung Ihrer Website',
      topicEn: 'modernising your website',
    },
    {
      id: 'processes',
      label:
        'Unsere Mitgliederverwaltung besteht aus mehreren Excel-Listen, die niemand vollständig überblickt.',
      response:
        'Ich kann Ihre Prozesse analysieren und prüfen, welche Abläufe sich sinnvoll digitalisieren lassen.',
      topic: 'die Digitalisierung Ihrer internen Prozesse',
      topicEn: 'digitising your internal processes',
    },
    {
      id: 'expertise',
      label:
        'Uns fehlt technisches Know-how, um gute Entscheidungen zu Website und Software zu treffen.',
      response:
        'Ich übersetze technische Möglichkeiten in verständliche Entscheidungen und begleite Sie bei der Umsetzung.',
      topic: 'eine verständliche technische Beratung',
      topicEn: 'clear technical advice',
    },
    {
      id: 'knowledge',
      label: 'Bei einem Wechsel im Vorstand gehen Zugänge, Abläufe und wichtiges Wissen verloren.',
      response:
        'Gemeinsam schaffen wir klare Strukturen, damit Zugänge, Abläufe und Wissen dauerhaft erhalten bleiben.',
      topic: 'eine nachhaltige Dokumentation und Übergabe',
      topicEn: 'sustainable documentation and handovers',
    },
  ];

  readonly selectedChallenges = computed(() => {
    const ids = this.selectedIds();
    return this.challenges.filter(challenge => ids.includes(challenge.id));
  });

  readonly topicSummary = computed(() => {
    const isGerman = this.language.language() === 'de';
    return this.joinTopics(
      this.selectedChallenges().map(challenge => (isGerman ? challenge.topic : challenge.topicEn)),
      isGerman ? 'und' : 'and',
    );
  });

  readonly prefill = computed<ContactPrefill>(() => {
    const isGerman = this.language.language() === 'de';
    const topics = this.selectedChallenges().map(challenge =>
      isGerman ? challenge.topic : challenge.topicEn,
    );
    const selectedItems = this.selectedChallenges()
      .map(challenge => `- ${challenge.label}`)
      .join('\n');
    return {
      subject: isGerman
        ? `Projektanfrage: ${this.joinTopics(topics, 'und')}`
        : 'Project enquiry based on the website selection',
      message: isGerman
        ? `Hallo Frau Waldenspuhl,\n\nwir möchten gerne Kontakt mit Ihnen aufnehmen. Folgende Themen beschäftigen unseren Verein aktuell:\n\n${selectedItems}\n\nWir interessieren uns daher für Unterstützung bei ${this.joinTopics(topics, 'und')} und würden gerne besprechen, welche Lösung zu unserem Verein passt.\n\nMit freundlichen Grüßen\n[Ihr Name]\n[Ihre Telefonnummer]`
        : `Hello Ms Waldenspuhl,\n\nWe would like to get in touch. These topics currently concern our association:\n\n${selectedItems}\n\nWe are interested in support with ${this.joinTopics(topics, 'and')} and would like to discuss which solution would suit our association.\n\nKind regards,\n[Your name]\n[Your phone number]`,
    };
  });

  isSelected(id: string): boolean {
    return this.selectedIds().includes(id);
  }

  toggle(id: string, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.selectedIds.update(ids =>
      checked ? [...ids, id] : ids.filter(selectedId => selectedId !== id),
    );
  }

  openContactForm(): void {
    this.contactFormRequested.emit(this.prefill());
  }

  private joinTopics(topics: string[], conjunction: string): string {
    if (topics.length < 2) return topics[0] ?? '';
    return `${topics.slice(0, -1).join(', ')} ${conjunction} ${topics.at(-1)}`;
  }
}
