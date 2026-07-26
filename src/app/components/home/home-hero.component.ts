import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-hero',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section
      id="home"
      class="club-section relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden"
    >
      <div
        class="container relative z-10 mx-auto grid w-full items-center gap-14 px-6 py-16 sm:px-12 lg:grid-cols-[1.15fr_0.85fr] lg:px-20"
      >
        <div class="text-center lg:text-left">
          <div
            class="mb-7 inline-flex rounded-full border border-emerald-200 bg-emerald-50/90 px-5 py-2 text-xs font-black uppercase tracking-[0.18em] text-emerald-700 shadow-sm dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 md:text-sm"
          >
            Vereinsarbeit. Einfacher gemacht.
          </div>
          <h1
            class="mb-8 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Mehr Zeit für das,
            <span
              class="bg-gradient-to-r from-green-700 via-emerald-600 to-teal-600 bg-clip-text text-transparent"
              >was euren Verein bewegt.</span
            >
          </h1>
          <p
            class="mx-auto mb-5 max-w-5xl text-lg leading-relaxed text-gray-600 dark:text-gray-300 md:text-xl lg:mx-0 lg:text-2xl"
          >
            vereinleicht bringt Website, Mitgliederverwaltung und eure täglichen Abläufe in eine
            verständliche digitale Struktur.
          </p>
          <p
            class="mx-auto mb-12 max-w-3xl text-base text-gray-500 dark:text-gray-400 md:text-lg lg:mx-0"
          >
            Persönlich begleitet, barrierearm gedacht und so einfach, dass alle mitmachen können.
          </p>
          <div class="flex flex-col justify-center gap-4 sm:flex-row sm:flex-wrap lg:justify-start">
            <a
              [routerLink]="['/']"
              fragment="services"
              class="group flex items-center justify-center gap-3 rounded-2xl bg-emerald-700 px-8 py-4 text-lg font-bold text-white shadow-xl shadow-emerald-900/20 transition-all hover:-translate-y-0.5 hover:bg-emerald-800"
            >
              Leistungen ansehen
              <span class="transition-transform group-hover:translate-x-1" aria-hidden="true"
                >→</span
              >
            </a>
            <a
              [routerLink]="['/']"
              fragment="approach"
              class="flex items-center justify-center rounded-2xl border border-emerald-500/40 bg-emerald-50 px-8 py-4 text-lg font-bold text-emerald-800 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-emerald-100 dark:border-emerald-500/50 dark:bg-emerald-950/40 dark:text-emerald-300"
            >
              So arbeiten wir
            </a>
            <a
              [routerLink]="['/']"
              fragment="contact"
              class="flex items-center justify-center rounded-2xl border border-emerald-200 bg-white/90 px-8 py-4 text-lg font-bold text-gray-900 shadow-sm transition-all hover:-translate-y-0.5 hover:border-emerald-500/50 dark:border-emerald-900 dark:bg-gray-900 dark:text-white"
            >
              Kontakt aufnehmen
            </a>
          </div>
        </div>

        <div class="relative mx-auto mb-8 w-full max-w-md lg:mb-0 lg:max-w-none">
          <div
            class="absolute -inset-4 rotate-3 rounded-[2.5rem] bg-emerald-200/70 dark:bg-emerald-900/40"
            aria-hidden="true"
          ></div>
          <figure
            class="relative overflow-hidden rounded-[2rem] border-4 border-white bg-white shadow-2xl shadow-emerald-950/20 dark:border-emerald-950"
          >
            <img
              src="sonja-portrait.jpeg"
              alt="Sonja Waldenspuhl am Strand"
              width="1280"
              height="1920"
              class="aspect-[4/5] w-full object-cover object-center"
            />
          </figure>
          <div
            class="absolute -bottom-6 left-4 right-4 rounded-2xl border border-emerald-100 bg-white/95 p-4 shadow-xl backdrop-blur dark:border-emerald-800 dark:bg-emerald-950/95 sm:left-auto sm:right-6 sm:max-w-xs"
          >
            <p class="font-black text-emerald-800 dark:text-emerald-200">Hi, ich bin Sonja.</p>
            <p class="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              Eure persönliche Ansprechpartnerin für digitale Vereinsarbeit.
            </p>
          </div>
        </div>
      </div>

      <div
        class="pointer-events-none absolute left-1/2 top-0 -z-0 h-full w-full -translate-x-1/2"
        aria-hidden="true"
      >
        <div
          class="absolute left-[-10%] top-[-20%] h-[60%] w-[60%] animate-pulse rounded-full bg-green-400/15 blur-[140px]"
        ></div>
        <div
          class="absolute bottom-[-20%] right-[-10%] h-[60%] w-[60%] animate-pulse rounded-full bg-emerald-400/15 blur-[140px] [animation-delay:2s]"
        ></div>
      </div>
    </section>
  `,
})
export class HomeHeroComponent {}
