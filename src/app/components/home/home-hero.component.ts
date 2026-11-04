import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-hero',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section id="home" class="vl-section hero">
      <div class="vl-wrap hero__grid">
        <div class="hero__text">
          <span class="vl-kicker">
            Hallo, liebe Vereine!
            <svg class="hero__arrow" viewBox="0 0 34 20" aria-hidden="true">
              <path d="M2 14c8-10 18-12 28-6M24 3l6 5-7 3"></path>
            </svg>
          </span>
          <h1 class="hero__title">
            Mehr Zeit für das, was euren Verein
            <span class="hero__mark"
              >bewegt.<svg viewBox="0 0 200 20" preserveAspectRatio="none" aria-hidden="true">
                <path d="M3 14c40-9 90-12 194-6"></path></svg
            ></span>
          </h1>
          <p class="hero__lead">
            Ich bringe eure Website, die Mitgliederverwaltung und eure täglichen Abläufe in eine
            Struktur, die alle verstehen – persönlich, barrierearm und ohne Fachchinesisch.
          </p>
          <div class="hero__actions">
            <a [routerLink]="['/']" fragment="contact" class="vl-btn vl-btn--primary">
              Erstgespräch vereinbaren
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6"></path>
              </svg>
            </a>
            <a [routerLink]="['/']" fragment="services" class="vl-btn vl-btn--secondary"
              >Was ich für euch mache</a
            >
          </div>
        </div>

        <div class="hero__visual">
          <figure class="hero__photo">
            <img
              src="sonja-portrait.jpeg"
              alt="Sonja Waldenspuhl lacht am Strand"
              width="1366"
              height="2048"
            />
          </figure>
          <a [routerLink]="['/']" fragment="offer" class="hero__sticker">
            <svg viewBox="0 0 200 200" aria-hidden="true">
              <path
                class="hero__star-fill"
                d="M100 16 134.1 57.1 183.7 76.8 155.2 121.9 151.7 175.2 100 162 48.3 175.2 44.8 121.9 16.3 76.8 65.9 57.1Z"
              ></path>
            </svg>
            <span class="hero__sticker-text">
              <strong>3×</strong>
              <span>Vereins-Websites kostenlos</span>
            </span>
          </a>
          <div class="hero__hi">
            <span class="hero__avatar" aria-hidden="true">SW</span>
            <span>
              <strong>Hi, ich bin Sonja!</strong>
              <small>Eure persönliche Ansprechpartnerin für digitale Vereinsarbeit.</small>
            </span>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    .hero {
      overflow: hidden;
    }

    .hero__grid {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
      align-items: center;
      gap: 64px;
    }

    .hero__text {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 26px;
    }

    .hero__arrow {
      width: 34px;
      height: 20px;
      fill: none;
      stroke: currentColor;
      stroke-width: 2.2;
      stroke-linecap: round;
    }

    .hero__title {
      font-size: clamp(44px, 5.3vw, 76px);
      font-weight: 600;
      line-height: 1.04;
      letter-spacing: -0.02em;
      color: var(--heading);
    }

    .hero__mark {
      position: relative;
      white-space: nowrap;
      color: var(--primary-ink);
    }

    .hero__mark svg {
      position: absolute;
      bottom: -0.18em;
      left: -2%;
      width: 104%;
      height: 0.36em;
      overflow: visible;
    }

    .hero__mark path {
      fill: none;
      stroke: var(--accent);
      stroke-width: 6;
      stroke-linecap: round;
    }

    .hero__lead {
      max-width: 540px;
      font-size: clamp(17.5px, 1.4vw, 20px);
      line-height: 1.7;
    }

    .hero__actions {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 14px;
    }

    .hero__visual {
      position: relative;
      height: 600px;
    }

    .hero__photo {
      position: absolute;
      top: 0;
      right: 0;
      left: 40px;
      height: 540px;
      overflow: hidden;
      border: 1.5px solid var(--border);
      border-radius: 36px;
      background: linear-gradient(150deg, var(--mint), var(--sun));
    }

    .hero__photo img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: 50% 42%;
    }

    .hero__sticker {
      position: absolute;
      top: -30px;
      right: -24px;
      display: block;
      width: 165px;
      height: 165px;
      color: var(--on-accent);
      transform: rotate(-10deg);
      transition: transform 150ms ease;
    }

    .hero__sticker:hover {
      transform: rotate(-4deg) scale(1.04);
    }

    .hero__sticker svg {
      width: 100%;
      height: 100%;
      overflow: visible;
      filter: drop-shadow(0 8px 12px rgb(0 0 0 / 0.28));
    }

    .hero__sticker path {
      stroke-linejoin: round;
    }

    .hero__star-fill {
      fill: var(--accent);
      stroke: var(--accent);
      stroke-width: 8;
    }

    .hero__sticker-text {
      position: absolute;
      top: 52%;
      left: 50%;
      display: flex;
      width: 84px;
      flex-direction: column;
      align-items: center;
      font-size: 11px;
      font-weight: 800;
      line-height: 1.1;
      text-align: center;
      transform: translate(-50%, -50%);
    }

    .hero__sticker strong {
      font-family: var(--font-serif);
      font-size: 28px;
      font-weight: 700;
      line-height: 1;
    }

    .hero__hi {
      position: absolute;
      bottom: 16px;
      left: 0;
      display: flex;
      max-width: 300px;
      align-items: center;
      gap: 14px;
      border-radius: 24px;
      background: var(--surface);
      padding: 18px 20px;
      box-shadow: 0 18px 40px var(--shadow);
      transform: rotate(-3deg);
    }

    .hero__avatar {
      display: grid;
      width: 52px;
      height: 52px;
      flex: none;
      place-items: center;
      border-radius: 50%;
      background: var(--peach);
      font-family: var(--font-serif);
      font-size: 18px;
      font-weight: 700;
      color: var(--heading);
    }

    .hero__hi strong {
      display: block;
      font-family: var(--font-hand);
      font-size: 28px;
      line-height: 1;
      color: var(--heading);
    }

    .hero__hi small {
      display: block;
      margin-top: 4px;
      font-size: 14px;
      line-height: 1.35;
      color: var(--muted);
    }

    @media (max-width: 960px) {
      .hero__grid {
        grid-template-columns: minmax(0, 1fr);
        gap: 48px;
      }

      .hero__visual {
        width: 100%;
        max-width: 560px;
        margin-inline: auto;
      }
    }

    @media (max-width: 700px) {
      .hero__actions {
        flex-direction: column;
        align-self: stretch;
      }

      .hero__actions .vl-btn {
        width: 100%;
      }

      .hero__visual {
        height: 470px;
      }

      .hero__photo {
        left: 0;
        height: 420px;
        border-radius: 28px;
      }

      .hero__sticker {
        top: -26px;
        right: -10px;
        width: 136px;
        height: 136px;
      }

      .hero__sticker-text {
        width: 70px;
        font-size: 10px;
      }

      .hero__sticker strong {
        font-size: 23px;
      }

      .hero__hi {
        bottom: 0;
        max-width: 250px;
        padding: 14px 16px;
      }

      .hero__hi strong {
        font-size: 24px;
      }
    }

    /* Niedrige Laptop-Bildschirme: Das Thema passt komplett ins Bild. */
    @media (min-width: 1101px) and (max-height: 920px) {
      .hero__text {
        gap: 16px;
      }
      .hero__title {
        font-size: clamp(40px, 4.6vw, 64px);
      }
      .hero__lead {
        font-size: 17px;
        line-height: 1.55;
      }
      .hero__visual {
        height: min(600px, calc(100svh - var(--header-h) - 48px));
      }
      .hero__photo {
        height: calc(100% - 44px);
      }
    }
  `,
})
export class HomeHeroComponent {}
