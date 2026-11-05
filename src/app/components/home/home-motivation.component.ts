import { Component } from '@angular/core';

@Component({
  selector: 'app-home-motivation',
  standalone: true,
  template: `
    <section id="motivation" class="vl-section">
      <div class="vl-wrap">
        <article class="motivation">
          <span class="vl-kicker">Motivation</span>
          <h2 class="vl-h2">Warum mir Vereinsarbeit am Herzen liegt</h2>
          <p>
            Ich lebe seit meiner Geburt mit Phenylketonurie – einer seltenen Stoffwechselerkrankung,
            die den Alltag oft kompliziert macht, auch wenn man von außen nichts sieht. Es gibt
            Phasen, in denen man sich mit einer seltenen Erkrankung allein fühlt: wenn Ärzte die
            Krankheit kaum kennen, wenn Standardlösungen nicht passen oder wenn niemand in der Nähe
            genau weiß, wie es sich anfühlt.
          </p>
          <p>
            Was mir in diesen Momenten am meisten geholfen hat, war die Gemeinschaft. Der Austausch
            mit anderen Betroffenen und das Gefühl, verstanden zu werden, ohne alles erklären zu
            müssen, haben mir gezeigt, wie wichtig Vereine und Selbsthilfegruppen für Menschen mit
            seltenen Erkrankungen sind. Ein guter Verein ist mehr als eine Organisation. Er kann ein
            Anker sein, wenn andere Anker fehlen.
          </p>
          <p class="motivation__closing">
            Genau deshalb möchte ich mit meiner Arbeit Vereine unterstützen, die Menschen verbinden
            – egal ob Sport, Kultur, Soziales oder Selbsthilfe. Damit die Energie, die sonst in
            umständliche Technik oder veraltete Systeme fließt, wieder dort ankommt, wo sie
            hingehört: bei den Menschen, für die es den Verein gibt.
          </p>
        </article>
      </div>
    </section>
  `,
  styles: `
    .motivation {
      display: flex;
      max-width: 900px;
      flex-direction: column;
      align-items: flex-start;
      gap: 20px;
      margin-inline: auto;
      border: 1px solid var(--border);
      border-radius: 24px;
      background: var(--surface);
      padding: clamp(20px, 5vw, 64px);
      box-shadow: 0 24px 50px var(--shadow);
    }

    .motivation p {
      font-size: clamp(17px, 1.4vw, 19px);
      line-height: 1.75;
    }

    .motivation__closing {
      font-weight: 600;
      color: var(--heading);
    }

    /* Niedrige Laptop-Bildschirme: Das Thema passt komplett ins Bild. */
    @media (min-width: 1101px) and (max-height: 920px) {
      .motivation {
        gap: 12px;
        padding: 32px 48px;
      }
      .motivation p {
        font-size: 16px;
        line-height: 1.55;
      }
    }
  `,
})
export class HomeMotivationComponent {}
