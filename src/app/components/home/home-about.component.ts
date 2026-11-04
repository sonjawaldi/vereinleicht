import { Component } from '@angular/core';

@Component({
  selector: 'app-home-about',
  standalone: true,
  template: `
    <section id="about" class="vl-section">
      <div class="vl-wrap about">
        <figure class="polaroid">
          <div class="polaroid__image">
            <img
              src="sonja-heute.jpeg"
              alt="Sonja Waldenspuhl hockt lachend im Dünengras am Strand"
              width="560"
              height="700"
              loading="lazy"
            />
          </div>
          <figcaption>Das bin ich!</figcaption>
        </figure>
        <div class="letter">
          <span class="vl-kicker">Über mich</span>
          <h2 class="vl-h2">Hi, ich bin Sonja.</h2>
          <p>
            Ich bin eure persönliche Ansprechpartnerin für digitale Vereinsarbeit. Die typischen
            Stolpersteine im Verein kenne ich aus eigener Erfahrung – deshalb baue ich nichts, was
            nach der Übergabe niemand mehr bedienen kann.
          </p>
          <ul class="values">
            @for (value of values; track value) {
              <li class="vl-check">
                <i aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"></path></svg>
                </i>
                {{ value }}
              </li>
            }
            <li class="vl-check">
              <i aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"></path></svg>
              </i>
              <span>
                <span
                  >Ehrenamtlich engagiert: Podiumsdiskussion auf der E.S.PKU-Konferenz 2025</span
                >
                <button type="button" class="proof-link" (click)="proofDialog.showModal()">
                  Nachweis ansehen
                </button>
              </span>
            </li>
          </ul>
          <span class="signature" aria-hidden="true">Sonja</span>
        </div>
      </div>
    </section>

    <dialog
      #proofDialog
      class="proof"
      aria-label="Teilnahmebescheinigung der E.S.PKU-Konferenz 2025"
      (click)="closeFromBackdrop($event, proofDialog)"
    >
      <button
        type="button"
        class="proof__close"
        aria-label="Ansicht schließen"
        (click)="proofDialog.close()"
      >
        &times;
      </button>
      <img
        src="es_pku_podiumsdiskussion_dig_pku.jpg"
        alt="Teilnahmebescheinigung der E.S.PKU-Konferenz 2025 in Hamburg für Sonja Waldenspuhl mit dem Vermerk, dass sie an einer Podiumsdiskussion teilgenommen hat"
        width="1077"
        height="763"
        loading="lazy"
      />
    </dialog>
  `,
  styles: `
    .about {
      display: grid;
      grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
      align-items: center;
      gap: clamp(48px, 6vw, 88px);
    }

    .polaroid {
      position: relative;
      border-radius: 12px;
      background: var(--surface);
      padding: 18px 18px 64px;
      box-shadow: 0 24px 50px var(--shadow);
      transform: rotate(-3deg);
    }

    .polaroid__image {
      aspect-ratio: 4 / 5;
      overflow: hidden;
      border-radius: 6px;
      background: linear-gradient(160deg, var(--peach), var(--sun));
    }

    .polaroid__image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: 50% 50%;
    }

    .polaroid figcaption {
      position: absolute;
      right: 0;
      bottom: 16px;
      left: 0;
      font-family: var(--font-hand);
      font-size: 30px;
      line-height: 1.2;
      text-align: center;
      color: var(--heading);
    }

    .letter {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 22px;
    }

    .letter > p {
      font-size: clamp(17px, 1.4vw, 19px);
      line-height: 1.75;
    }

    .values {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .signature {
      font-family: var(--font-hand);
      font-size: 46px;
      line-height: 1;
      color: var(--primary-ink);
      transform: rotate(-3deg);
    }

    .proof-link {
      display: inline-block;
      margin-left: 4px;
      font-weight: 800;
      color: var(--primary-ink);
      text-decoration: underline;
      text-underline-offset: 3px;
      cursor: pointer;
    }

    .proof {
      width: min(920px, calc(100vw - 32px));
      max-width: none;
      margin: auto;
      overflow: hidden;
      border-radius: 20px;
      background: #fff;
      padding: 0;
    }

    .proof::backdrop {
      background: rgb(15 12 8 / 0.75);
    }

    .proof img {
      display: block;
      width: 100%;
      height: auto;
    }

    .proof__close {
      position: absolute;
      top: 10px;
      right: 10px;
      display: grid;
      width: 44px;
      height: 44px;
      place-items: center;
      border-radius: 50%;
      background: #1f2d3a;
      font-size: 26px;
      line-height: 1;
      color: #fff;
      cursor: pointer;
    }

    @media (max-width: 960px) {
      .about {
        grid-template-columns: minmax(0, 1fr);
      }

      .polaroid {
        width: 100%;
        max-width: 300px;
        margin-inline: auto;
      }
    }
  `,
})
export class HomeAboutComponent {
  readonly values = [
    'Eine feste Ansprechpartnerin statt wechselnder Hotline',
    'Verständliche Sprache statt Fachchinesisch',
    'Lösungen, die auch nach dem Vorstandswechsel funktionieren',
  ];

  closeFromBackdrop(event: MouseEvent, dialog: HTMLDialogElement): void {
    if (event.target === dialog) dialog.close();
  }
}
