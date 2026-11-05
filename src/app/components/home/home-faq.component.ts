import { Component, signal } from '@angular/core';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

@Component({
  selector: 'app-home-faq',
  standalone: true,
  template: `
    <section id="faq" class="vl-section vl-section--sand">
      <div class="vl-wrap">
        <div class="vl-head">
          <span class="vl-kicker">Gut zu wissen</span>
          <h2 class="vl-h2">Eure Fragen</h2>
        </div>
        <div class="faq">
          @for (item of items; track item.id) {
            <div class="faq__item" [class.faq__item--open]="isOpen(item.id)">
              <h3>
                <button
                  type="button"
                  [id]="'faq-q-' + item.id"
                  [attr.aria-expanded]="isOpen(item.id)"
                  [attr.aria-controls]="'faq-a-' + item.id"
                  (click)="toggle(item.id)"
                >
                  <span>{{ item.question }}</span>
                  <i aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      @if (isOpen(item.id)) {
                        <path d="M5 12h14"></path>
                      } @else {
                        <path d="M12 5v14M5 12h14"></path>
                      }
                    </svg>
                  </i>
                </button>
              </h3>
              <div
                role="region"
                [id]="'faq-a-' + item.id"
                [attr.aria-labelledby]="'faq-q-' + item.id"
                [hidden]="!isOpen(item.id)"
              >
                <p>{{ item.answer }}</p>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .faq {
      display: flex;
      max-width: 840px;
      flex-direction: column;
      gap: 14px;
      margin: 0 auto;
    }

    .faq__item {
      border: 1.5px solid var(--border);
      border-radius: 24px;
      background: var(--surface);
      padding: 22px 28px;
    }

    .faq__item button {
      display: flex;
      width: 100%;
      align-items: center;
      gap: 16px;
      font-family: var(--font-serif);
      font-size: 21px;
      font-weight: 600;
      line-height: 1.3;
      text-align: left;
      color: var(--heading);
      cursor: pointer;
    }

    .faq__item button span {
      flex: 1;
    }

    .faq__item i {
      display: grid;
      width: 40px;
      height: 40px;
      flex: none;
      place-items: center;
      border-radius: 14px;
      background: var(--sand);
    }

    .faq__item--open i {
      background: var(--accent);
    }

    .faq__item svg {
      width: 18px;
      height: 18px;
      fill: none;
      stroke: var(--heading);
      stroke-width: 2.4;
      stroke-linecap: round;
    }

    .faq__item--open svg {
      stroke: var(--on-accent);
    }

    .faq__item p {
      margin-top: 12px;
      line-height: 1.7;
    }

    @media (max-width: 700px) {
      .faq__item {
        padding: 18px 20px;
      }

      .faq__item button {
        font-size: 18px;
      }
    }

    /* Niedrige Laptop-Bildschirme: Das Thema passt komplett ins Bild. */
    @media (min-width: 1101px) and (max-height: 920px) {
      .faq {
        gap: 8px;
      }
      .faq__item {
        padding: 12px 20px;
      }
      .faq__item button {
        font-size: 18px;
      }
      .faq__item i {
        width: 32px;
        height: 32px;
        border-radius: 10px;
      }
      .faq__item p {
        margin-top: 6px;
        font-size: 15.5px;
        line-height: 1.5;
      }
    }
  `,
})
export class HomeFaqComponent {
  readonly items: FaqItem[] = [
    {
      id: 'kosten',
      question: 'Was kostet die Website im Kennenlernangebot?',
      answer:
        'Für die ersten drei Vereine ist die Erstellung kostenlos. Die Domain zahlt ihr selbst, das Hosting kann ich auf Wunsch für 15 €/Monat übernehmen.',
    },
    {
      id: 'seiten',
      question: 'Wie viele Seiten sind enthalten?',
      answer:
        'Bis zu 5 Seiten. Sonderfunktionen wie Mitgliederverwaltung, Portale oder Buchungssysteme sind im Kennenlernangebot nicht enthalten.',
    },
    {
      id: 'pflege',
      question: 'Können wir die Website selbst pflegen?',
      answer:
        'Ja. Die Website ist so gebaut, dass euer Team sie selbst aktuell halten kann. Bei der Übergabe bekommt ihr eine verständliche Einweisung und eine Dokumentation.',
    },
    {
      id: 'hinweis',
      question: 'Steht irgendwo, dass die Seite von vereinleicht ist?',
      answer:
        'Ja, im Footer steht ein dezenter Hinweis, dass die Website von mir erstellt wurde. Das gehört zum Kennenlernangebot dazu.',
    },
  ];

  private readonly openIds = signal<string[]>(['kosten']);

  isOpen(id: string): boolean {
    return this.openIds().includes(id);
  }

  toggle(id: string): void {
    this.openIds.update(ids =>
      ids.includes(id) ? ids.filter(openId => openId !== id) : [...ids, id],
    );
  }
}
