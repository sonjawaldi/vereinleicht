import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-process',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section id="approach" class="vl-section vl-section--sand">
      <div class="vl-wrap">
        <div class="vl-head">
          <span class="vl-kicker">Zusammenarbeit auf Augenhöhe</span>
          <h2 class="vl-h2">So läuft's bei uns</h2>
          <p class="vl-lead">
            Wir starten mit dem, was schon da ist, und vereinfachen nur, was wirklich Zeit kostet –
            mit fester Ansprechpartnerin, verständlichen Entscheidungen und einer sauberen Übergabe
            an euer Team.
          </p>
        </div>

        <ol class="path">
          <li class="step step--go">
            <span class="step__num">1</span>
            <h3>Kennenlernen</h3>
            <p>Ein kostenloses Erstgespräch – ich höre zu, was euren Verein bewegt.</p>
            <span class="step__hand">bei Kaffee oder per Video</span>
          </li>
          <li class="step">
            <span class="step__num">2</span>
            <h3>Vereins-Check</h3>
            <p>Was ist schon da, was fehlt, was kostet euch unnötig Zeit?</p>
          </li>
          <li class="step">
            <span class="step__num">3</span>
            <h3>Umsetzung</h3>
            <p>Website und Abläufe entstehen Schritt für Schritt und immer mit euch abgestimmt.</p>
          </li>
          <li class="step">
            <span class="step__num">4</span>
            <h3>Übergabe &amp; Support</h3>
            <p>Verständliche Einweisung, Dokumentation und Hilfe, wenn ihr sie braucht.</p>
          </li>
        </ol>

        <div class="path-cta">
          <a [routerLink]="['/']" fragment="contact" class="vl-btn vl-btn--primary">
            Erstgespräch vereinbaren
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  `,
  styles: `
    .path {
      position: relative;
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 28px;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .path::before {
      content: '';
      position: absolute;
      top: 40px;
      right: 40px;
      left: 40px;
      border-top: 3px dashed var(--path);
    }

    .step {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
    }

    .step__num {
      display: grid;
      width: 80px;
      height: 80px;
      place-items: center;
      margin-bottom: 8px;
      border: 3px solid var(--heading);
      border-radius: 50%;
      background: var(--surface);
      font-family: var(--font-serif);
      font-size: 34px;
      font-weight: 700;
      color: var(--heading);
    }

    .step--go .step__num {
      border-color: var(--accent);
      background: var(--accent);
      color: var(--on-accent);
    }

    .step h3 {
      font-size: 24px;
      font-weight: 600;
      color: var(--heading);
    }

    .step p {
      font-size: 16.5px;
      line-height: 1.6;
    }

    .step__hand {
      font-family: var(--font-hand);
      font-size: 22px;
      font-weight: 600;
      color: var(--coral-ink);
    }

    .path-cta {
      display: flex;
      justify-content: center;
      margin-top: 64px;
    }

    @media (max-width: 960px) {
      .path {
        grid-template-columns: minmax(0, 1fr);
      }

      .path::before {
        top: 32px;
        right: auto;
        bottom: 32px;
        left: 31px;
        border-top: 0;
        border-left: 3px dashed var(--path);
      }

      .step {
        display: grid;
        grid-template-columns: 64px minmax(0, 1fr);
        align-items: start;
        gap: 6px 16px;
      }

      .step__num {
        grid-row: span 3;
        width: 64px;
        height: 64px;
        margin-bottom: 0;
        font-size: 28px;
      }

      .step > *:not(.step__num) {
        grid-column: 2;
      }
    }

    @media (max-width: 700px) {
      .path-cta .vl-btn {
        width: 100%;
      }
    }
  `,
})
export class HomeProcessComponent {}
