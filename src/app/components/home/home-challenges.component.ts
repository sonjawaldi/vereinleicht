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
  title: string;
  text: string;
  response: string;
  topic: string;
  topicEn: string;
}

@Component({
  selector: 'app-home-challenges',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section id="challenges" class="vl-section vl-section--sand">
      <div class="vl-wrap">
        <div class="vl-head">
          <span class="vl-kicker">Ehrlich gesagt …</span>
          <h2 class="vl-h2">Kennt ihr das?</h2>
          <p class="vl-lead">
            Diese Zettel hängen in fast jedem Vereinsheim. Welcher davon könnte bei euch hängen?
            Tippt an, was passt.
          </p>
        </div>

        <div class="notes">
          @for (challenge of challenges; track challenge.id) {
            <article class="note" [class.note--selected]="isSelected(challenge.id)">
              <svg class="vl-icon" viewBox="0 0 24 24" aria-hidden="true">
                @switch (challenge.id) {
                  @case ('website') {
                    <rect x="6" y="2.5" width="12" height="19" rx="2.5"></rect>
                    <path d="M11 18h2"></path>
                  }
                  @case ('processes') {
                    <rect x="3" y="4" width="18" height="16" rx="2"></rect>
                    <path d="M3 9.5h18M3 15h18M9 4v16"></path>
                  }
                  @case ('expertise') {
                    <circle cx="12" cy="12" r="9"></circle>
                    <path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .9-1 1.6v.6M12 17h.01"></path>
                  }
                  @case ('knowledge') {
                    <circle cx="8" cy="15" r="4"></circle>
                    <path d="M11 12l8.5-8.5M16 7l2.5 2.5M18.5 4.5L21 7"></path>
                  }
                }
              </svg>
              <h3>{{ challenge.title }}</h3>
              <p>{{ challenge.text }}</p>
              @if (isSelected(challenge.id)) {
                <p class="note__response">{{ challenge.response }}</p>
              }
              <button
                type="button"
                class="note__toggle"
                [attr.aria-pressed]="isSelected(challenge.id)"
                (click)="toggle(challenge.id)"
              >
                <span class="sr-only">Trifft bei uns zu:</span>
                <span class="sr-only">{{ challenge.title }}</span>
                @if (isSelected(challenge.id)) {
                  <span class="note__stamp" aria-hidden="true">
                    <svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"></path></svg>
                    Kennen wir!
                  </span>
                } @else {
                  <span class="note__ask" aria-hidden="true">Auch bei euch?</span>
                }
              </button>
            </article>
          }
        </div>

        <div class="after">
          <span class="after__avatar" aria-hidden="true">SW</span>
          <p aria-live="polite">
            @if (selectedChallenges().length && contactFormEnabled) {
              <span>{{ selectionSummary() }}</span>
            } @else {
              <span
                >Ich kenne diese Herausforderungen aus eigener Erfahrung – und baue Lösungen, die
                dazu passen: bezahlbar, einfach zu pflegen und langfristig tragfähig.</span
              >
            }
            <small>– Sonja</small>
          </p>
          @if (selectedChallenges().length && contactFormEnabled) {
            <button type="button" class="vl-btn vl-btn--accent" (click)="openContactForm()">
              Projekt besprechen
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6"></path>
              </svg>
            </button>
          } @else {
            <a [routerLink]="['/']" fragment="services" class="vl-btn vl-btn--accent">
              Zeig mir die Lösung
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6"></path>
              </svg>
            </a>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .notes {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      align-items: start;
      gap: 24px;
    }

    .note {
      position: relative;
      display: flex;
      min-height: 300px;
      flex-direction: column;
      gap: 14px;
      border-radius: 8px 8px 28px 8px;
      padding: 30px 26px 28px;
      box-shadow: 0 12px 28px var(--shadow);
      transition: transform 150ms ease;
    }

    .note:nth-child(1) {
      background: var(--sun);
      transform: rotate(-2deg);
    }

    .note:nth-child(2) {
      margin-top: 28px;
      background: var(--mint);
      transform: rotate(1.5deg);
    }

    .note:nth-child(3) {
      background: var(--peach);
      transform: rotate(-1deg);
    }

    .note:nth-child(4) {
      margin-top: 20px;
      background: var(--sky);
      transform: rotate(2deg);
    }

    .note:hover,
    .note--selected {
      transform: rotate(0);
    }

    .note--selected {
      outline: 3px solid var(--primary-ink);
      outline-offset: 3px;
    }

    .note::before {
      content: '';
      position: absolute;
      top: -12px;
      left: 50%;
      width: 84px;
      height: 24px;
      margin-left: -42px;
      border-radius: 3px;
      background: var(--tape);
      transform: rotate(-3deg);
    }

    .note h3 {
      font-size: 23px;
      font-weight: 600;
      line-height: 1.2;
      color: var(--heading);
    }

    .note p {
      font-size: 16px;
      line-height: 1.6;
    }

    .note .note__response {
      border-left: 3px solid var(--primary-ink);
      padding-left: 12px;
      font-weight: 700;
      color: var(--heading);
    }

    .note__toggle {
      align-self: flex-start;
      margin-top: auto;
      cursor: pointer;
    }

    /* Der ganze Zettel ist die Klickfläche. */
    .note__toggle::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
    }

    .note__toggle:focus-visible {
      outline: none;
    }

    .note__toggle:focus-visible::after {
      outline: 3px solid var(--primary-ink);
      outline-offset: 3px;
      border-radius: 8px 8px 28px 8px;
    }

    .note__stamp,
    .note__ask {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      border-radius: 999px;
      padding: 6px 12px;
      font-size: 13.5px;
      line-height: 1.4;
    }

    .note__stamp {
      border: 2px solid var(--coral-ink);
      font-weight: 800;
      color: var(--coral-ink);
      transform: rotate(-4deg);
    }

    .note__stamp svg {
      width: 14px;
      height: 14px;
      fill: none;
      stroke: currentColor;
      stroke-width: 3;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    .note__ask {
      border: 2px dashed var(--muted);
      font-weight: 700;
      color: var(--muted);
    }

    .after {
      display: grid;
      grid-template-columns: auto minmax(0, 1fr) auto;
      align-items: center;
      gap: 28px;
      margin-top: 72px;
      border: 1.5px solid var(--border);
      border-radius: 32px;
      background: var(--surface);
      padding: 28px 36px;
    }

    .after__avatar {
      display: grid;
      width: 72px;
      height: 72px;
      place-items: center;
      border-radius: 50%;
      background: var(--peach);
      font-family: var(--font-serif);
      font-size: 24px;
      font-weight: 700;
      color: var(--heading);
    }

    .after p {
      font-size: 19px;
      font-weight: 600;
      line-height: 1.6;
      color: var(--heading);
    }

    .after small {
      display: block;
      margin-top: 4px;
      font-family: var(--font-hand);
      font-size: 24px;
      font-weight: 600;
      color: var(--coral-ink);
    }

    @media (max-width: 1100px) {
      .notes {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 32px 24px;
      }

      .note {
        min-height: 0;
        margin-top: 0 !important;
      }

      .after {
        grid-template-columns: auto minmax(0, 1fr);
      }

      .after .vl-btn {
        grid-column: 1 / -1;
        justify-self: start;
      }
    }

    @media (max-width: 700px) {
      .notes {
        grid-template-columns: minmax(0, 1fr);
        gap: 28px;
      }

      .after {
        grid-template-columns: minmax(0, 1fr);
        gap: 16px;
        margin-top: 48px;
        padding: 24px;
      }

      .after p {
        font-size: 17px;
      }

      .after .vl-btn {
        width: 100%;
      }
    }
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
      title: '„Unsere Website ist von 2014.“',
      text: 'Seit Jahren nicht aktualisiert – und auf dem Handy kaum zu bedienen.',
      response: 'Wir schauen gemeinsam, was bleiben kann und wo sich eine Modernisierung lohnt.',
      topic: 'die Modernisierung eurer Website',
      topicEn: 'modernising your website',
    },
    {
      id: 'processes',
      title: '„Welche Excel-Liste ist die aktuelle?“',
      text: 'Die Mitglieder stehen in mehreren Listen – und niemand hat den Überblick.',
      response: 'Ich prüfe mit euch, welche Abläufe sich sinnvoll digitalisieren lassen.',
      topic: 'die Digitalisierung eurer internen Abläufe',
      topicEn: 'digitising your internal processes',
    },
    {
      id: 'expertise',
      title: '„Kennt sich jemand mit Technik aus?“',
      text: 'Euch fehlt das Know-how, um gute Entscheidungen zu Website und Software zu treffen.',
      response: 'Ich übersetze Technik in verständliche Entscheidungen und begleite die Umsetzung.',
      topic: 'eine verständliche technische Beratung',
      topicEn: 'clear technical advice',
    },
    {
      id: 'knowledge',
      title: '„Wo sind die Zugangsdaten hin?“',
      text: 'Beim Vorstandswechsel gehen Zugänge, Abläufe und wichtiges Wissen verloren.',
      response: 'Wir schaffen klare Strukturen, damit Zugänge und Wissen im Verein bleiben.',
      topic: 'eine saubere Dokumentation und Übergabe',
      topicEn: 'sustainable documentation and handovers',
    },
  ];

  readonly selectedChallenges = computed(() => {
    const ids = this.selectedIds();
    return this.challenges.filter(challenge => ids.includes(challenge.id));
  });

  readonly selectionSummary = computed(() => {
    const isGerman = this.language.language() === 'de';
    const topics = this.joinTopics(
      this.selectedChallenges().map(challenge => (isGerman ? challenge.topic : challenge.topicEn)),
      isGerman ? 'und' : 'and',
    );
    return isGerman
      ? `Das klingt nach einem Projekt, bei dem ich euch unterstützen kann. Schauen wir uns gemeinsam ${topics} an?`
      : `This sounds like a project I can help you with. Shall we look at ${topics} together?`;
  });

  readonly prefill = computed<ContactPrefill>(() => {
    const isGerman = this.language.language() === 'de';
    const selectedItems = this.selectedChallenges()
      .map(challenge => `- ${challenge.title} ${challenge.text}`)
      .join('\n');
    return {
      subject: isGerman
        ? 'Projektanfrage aus der Themenauswahl'
        : 'Project enquiry based on the website selection',
      message: isGerman
        ? `Hallo Sonja,\n\nfolgende Themen beschäftigen unseren Verein gerade:\n\n${selectedItems}\n\nWir würden gerne besprechen, welche Lösung zu uns passt.\n\nViele Grüße`
        : `Hello Sonja,\n\nThese topics currently concern our association:\n\n${selectedItems}\n\nWe would like to discuss which solution would suit us.\n\nKind regards`,
    };
  });

  isSelected(id: string): boolean {
    return this.selectedIds().includes(id);
  }

  toggle(id: string): void {
    this.selectedIds.update(ids =>
      ids.includes(id) ? ids.filter(selectedId => selectedId !== id) : [...ids, id],
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
