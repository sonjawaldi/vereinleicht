import { Component, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CONTACT_FORM_ENABLED } from '../../config/feature-flags';

@Component({
  selector: 'app-home-offer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section id="offer" class="vl-section">
      <div class="vl-wrap offer">
        <div class="offer__main">
          <span class="vl-kicker offer__kicker">Kennenlernangebot</span>
          <h2 class="vl-h2">Die ersten 3 Vereins-Websites mache ich kostenlos.</h2>
          <p class="vl-lead">
            Damit euer Verein online gefunden wird – von neuen Mitgliedern, Besucher:innen und
            Unterstützer:innen. Modern, fürs Handy optimiert und bei Google sichtbar.
          </p>
          <div class="seats">
            <span aria-hidden="true">
              <i class="seats__full">
                <svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"></path></svg>
              </i>
              <i></i>
              <i></i>
            </span>
            Noch 2 von 3 Plätzen frei
          </div>
          @if (contactFormEnabled) {
            <button
              type="button"
              class="vl-btn vl-btn--primary"
              (click)="appointmentRequested.emit()"
            >
              Jetzt unverbindlich Termin sichern
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6"></path>
              </svg>
            </button>
          } @else {
            <a [routerLink]="['/']" fragment="contact" class="vl-btn vl-btn--primary">
              Jetzt unverbindlich Termin sichern
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6"></path>
              </svg>
            </a>
          }
        </div>
        <div class="rules">
          <h3>Das Kleingedruckte – ganz groß</h3>
          <ul>
            @for (rule of rules; track rule) {
              <li class="vl-check">
                <i aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"></path></svg>
                </i>
                {{ rule }}
              </li>
            }
          </ul>
        </div>
      </div>
    </section>
  `,
  styles: `
    .offer {
      position: relative;
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
      gap: 56px;
      border-radius: 12px 12px 40px 12px;
      background: var(--sun);
      padding: 72px 64px 64px;
      box-shadow: 0 24px 50px var(--shadow);
      transform: rotate(-0.6deg);
    }

    .offer::before {
      content: '';
      position: absolute;
      top: -16px;
      left: 50%;
      width: 140px;
      height: 32px;
      margin-left: -70px;
      border-radius: 3px;
      background: var(--tape);
      transform: rotate(2deg);
    }

    .offer__main {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 20px;
    }

    .seats {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 12px;
      font-weight: 800;
      color: var(--heading);
    }

    .seats span {
      display: flex;
      gap: 8px;
    }

    .seats i {
      display: grid;
      width: 40px;
      height: 40px;
      place-items: center;
      border: 2.5px dashed var(--heading);
      border-radius: 50%;
      opacity: 0.6;
    }

    .seats .seats__full {
      border-style: solid;
      background: var(--heading);
      opacity: 1;
    }

    .seats svg {
      width: 18px;
      height: 18px;
      fill: none;
      stroke: var(--sun);
      stroke-width: 3;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    .rules {
      align-self: start;
      border-radius: 28px;
      background: var(--surface);
      padding: 32px;
    }

    .rules h3 {
      font-size: 24px;
      font-weight: 600;
      line-height: 1.25;
      color: var(--heading);
    }

    .rules ul {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin: 16px 0 0;
      padding: 0;
      list-style: none;
    }

    .rules .vl-check {
      font-weight: 600;
    }

    @media (max-width: 1100px) {
      .offer {
        grid-template-columns: minmax(0, 1fr);
        gap: 36px;
        padding: 56px 40px 40px;
      }
    }

    @media (max-width: 700px) {
      .offer {
        gap: 28px;
        border-radius: 10px 10px 30px 10px;
        padding: 44px 22px 26px;
      }

      .offer__main .vl-btn {
        width: 100%;
        padding: 14px 20px;
        text-align: center;
        white-space: normal;
      }

      .rules {
        padding: 22px;
      }
    }

    /* Niedrige Laptop-Bildschirme: Das Thema passt komplett ins Bild. */
    @media (min-width: 1101px) and (max-height: 920px) {
      .offer {
        gap: 32px;
        padding: 32px 40px 28px;
      }
      .offer__main {
        gap: 12px;
      }
      .seats i {
        width: 30px;
        height: 30px;
      }
      .seats svg {
        width: 14px;
        height: 14px;
      }
      .rules {
        padding: 20px;
      }
      .rules h3 {
        font-size: 20px;
      }
      .rules ul {
        gap: 8px;
        margin-top: 10px;
      }
      .rules .vl-check {
        font-size: 14.5px;
        line-height: 1.35;
      }
    }
  `,
})
export class HomeOfferComponent {
  readonly appointmentRequested = output<void>();
  readonly contactFormEnabled = CONTACT_FORM_ENABLED;
  readonly rules = [
    'Einmalige, kostenlose Erstellung im Rahmen meiner Portfolio-Aktion',
    'Ein dezenter Hinweis im Footer, dass die Website von mir ist',
    'Domain und Hosting bezahlt ihr selbst',
    'Bis zu 5 Seiten – ohne Sonderfunktionen wie Mitgliederverwaltung, Portale oder Buchungssysteme',
    'Nicht für größere Organisationen und Verbände oder Websites mit hohem Funktions- oder Verwaltungsaufwand',
  ];
}
