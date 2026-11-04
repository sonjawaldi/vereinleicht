import { Component } from '@angular/core';

@Component({
  selector: 'app-services',
  standalone: true,
  templateUrl: './services.component.html',
  styles: `
    .cards {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 24px;
    }

    .card {
      display: flex;
      align-items: flex-start;
      gap: 24px;
      border-radius: 32px;
      padding: 36px;
    }

    .card:nth-child(1) {
      background: var(--mint);
    }

    .card:nth-child(2) {
      background: var(--sun);
    }

    .card:nth-child(3) {
      background: var(--peach);
    }

    .card:nth-child(4) {
      background: var(--sky);
    }

    .card__icon {
      display: grid;
      width: 64px;
      height: 64px;
      flex: none;
      place-items: center;
      border-radius: 22px;
      background: var(--surface);
      box-shadow: 0 6px 0 rgb(0 0 0 / 0.06);
    }

    .card__text {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .card__tag {
      font-size: 13px;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--muted);
    }

    .card h3 {
      font-size: 28px;
      font-weight: 600;
      line-height: 1.15;
      color: var(--heading);
    }

    .card p {
      line-height: 1.65;
    }

    @media (max-width: 960px) {
      .cards {
        grid-template-columns: minmax(0, 1fr);
        gap: 16px;
      }
    }

    @media (max-width: 700px) {
      .card {
        flex-direction: column;
        gap: 16px;
        border-radius: 26px;
        padding: 24px;
      }

      .card h3 {
        font-size: 24px;
      }
    }
  `,
})
export class ServicesComponent {}
