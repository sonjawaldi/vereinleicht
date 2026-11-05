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
          <h2 class="vl-h2">Für meine ersten 3 Vereine mache ich die Website kostenlos.</h2>
          <p class="vl-lead">Mein Beitrag fürs Ehrenamt, regulärer Wert ca. 1.000 €. Im Gegenzug darf ich euer Projekt als Referenz zeigen, und ihr gebt mir ein kurzes Feedback.</p>
        </div>
        <div class="offer__side">
          <div class="seats">
            <span aria-hidden="true">
              <i class="seats__full">
                <svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"></path></svg>
              </i>
              <i></i>
              <i></i>
            </span>
            Noch 2 von 3 Plätzen für Vereine frei
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
          <div class="rules__groups">
            @for (group of groups; track group.title) {
              <div class="rules__group">
                <h4>{{ group.title }}</h4>
                <ul>
                  @for (item of group.items; track item) {
                    <li class="vl-check">
                      <i aria-hidden="true">
                        <svg viewBox="0 0 24 24"><path [attr.d]="group.icon"></path></svg>
                      </i>
                      {{ item }}
                    </li>
                  }
                </ul>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    .offer {
      position: relative;
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      align-items: center;
      gap: 32px 56px;
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
      gap: 12px;
    }

    .offer__side {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
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
      grid-column: 1 / -1;
    }

    .rules h3 {
      font-size: 22px;
      font-weight: 600;
      line-height: 1.25;
      color: var(--heading);
    }

    .rules__groups {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 12px;
      margin-top: 12px;
    }

    .rules__group {
      border-radius: 20px;
      background: var(--surface);
      padding: 18px;
    }

    .rules__group h4 {
      margin: 0;
      font-size: 14px;
      font-weight: 800;
      line-height: 1.3;
      color: var(--heading);
    }

    .rules ul {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin: 10px 0 0;
      padding: 0;
      list-style: none;
    }

    .rules .vl-check {
      font-size: 14.5px;
      font-weight: 600;
      line-height: 1.35;
    }

    @media (max-width: 1100px) {
      .offer {
        grid-template-columns: minmax(0, 1fr);
        gap: 28px;
        padding: 56px 40px 40px;
      }

      .rules__groups {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (max-width: 700px) {
      .offer {
        gap: 28px;
        border-radius: 10px 10px 30px 10px;
        padding: 44px 22px 26px;
      }

      .offer__side,
      .offer__side .vl-btn {
        width: 100%;
      }

      .offer__side .vl-btn {
        padding: 14px 20px;
        text-align: center;
        white-space: normal;
      }

      .rules__groups {
        grid-template-columns: minmax(0, 1fr);
      }
    }

    /* Niedrige Laptop-Bildschirme: Das Thema passt komplett ins Bild. */
    @media (min-width: 1101px) and (max-height: 920px) {
      .offer {
        gap: 16px 32px;
        padding: 28px 32px 24px;
      }
      .offer__main {
        gap: 8px;
      }
      .offer__main .vl-h2 {
        font-size: 34px;
      }
      .rules__groups {
        gap: 8px;
      }
      .rules .vl-check {
        gap: 8px;
        font-size: 14px;
      }
      .rules .vl-check i {
        width: 20px;
        height: 20px;
      }
      .rules .vl-check svg {
        width: 12px;
        height: 12px;
      }
      .seats i {
        width: 30px;
        height: 30px;
      }
      .seats svg {
        width: 14px;
        height: 14px;
      }
      .rules__group {
        padding: 12px;
      }
      .rules h3 {
        font-size: 20px;
      }
    }
  `,
})
export class HomeOfferComponent {
  readonly appointmentRequested = output<void>();
  readonly contactFormEnabled = CONTACT_FORM_ENABLED;
  readonly groups = [
    {
      title: 'Das bekommt ihr',
      icon: 'M5 12.5l4.5 4.5L19 7.5',
      items: [
        'Kostenlos, Wert ca. 1.000 €',
        'Bis zu 5 Seiten, fürs Handy',
        'Kontaktformular, SEO-Grundlagen',
        '1 Korrekturrunde, Einweisung',
      ],
    },
    {
      title: 'Das kommt von euch',
      icon: 'M5 12h14M13 6l6 6-6 6',
      items: [
        'Referenz mit Vorher-Nachher',
        'Feedback mit eurem Namen',
        'Texte, Bilder, Logo in 3 Wochen',
        'VereinLeicht-Hinweis im Footer',
      ],
    },
    {
      title: 'Kosten danach',
      icon: 'M12 5v14M5 12h14',
      items: [
        'Domain zahlt ihr selbst',
        'Hosting optional: 15 €/Monat',
        'Pflege optional: ab 49 €/Monat',
        'Änderungen: 65 €/h',
      ],
    },
    {
      title: 'Nicht enthalten',
      icon: 'M6 6l12 12M18 6L6 18',
      items: [
        'Shops, Buchungssysteme',
        'Portale, Mitgliederverwaltung',
        'Texterstellung, Fotoshooting',
        'Große Organisationen, Verbände',
      ],
    },
  ];
}
