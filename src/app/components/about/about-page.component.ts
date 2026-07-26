import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { HomeContactComponent } from '../home/home-contact.component';
import { ProjectsComponent } from '../projects/projects.component';
import { ServicesComponent } from '../services/services.component';
import { AboutComponent } from './about.component';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [
    HeaderComponent,
    AboutComponent,
    ServicesComponent,
    ProjectsComponent,
    HomeContactComponent,
    FooterComponent,
  ],
  template: `
    <div class="min-h-screen bg-white transition-colors duration-300 dark:bg-black">
      <app-header area="business" />
      <main id="main-content" tabindex="-1">
        <section
          id="home"
          class="relative overflow-hidden bg-white px-6 py-20 dark:bg-black sm:px-12 lg:px-20"
        >
          <div
            class="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10"
          ></div>
          <div class="relative mx-auto max-w-5xl">
            <p class="text-xs font-bold uppercase tracking-[0.22em] text-purple-500">
              Softwareentwicklung aus Kiel
            </p>
            <h1
              class="mt-4 max-w-4xl text-4xl font-black tracking-tight text-gray-900 dark:text-white md:text-6xl"
            >
              Ich entwickle digitale Lösungen, die Menschen wirklich weiterbringen.
            </h1>
            <p class="mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-300">
              Ich bin Sonja Waldenspuhl, Informatik-Studentin und Softwareentwicklerin. Hier zeige
              ich, was ich kann, welche Leistungen ich anbiete und welche Projekte daraus entstehen.
            </p>
            <div class="mt-8 flex flex-wrap gap-3">
              <a
                href="#about"
                class="rounded-2xl bg-purple-600 px-6 py-3 font-bold text-white shadow-lg shadow-purple-600/20 transition hover:-translate-y-0.5 hover:bg-purple-700"
              >
                Mehr über mich
              </a>
              <a
                href="#services"
                class="rounded-2xl border border-gray-200 px-6 py-3 font-bold text-gray-800 transition hover:border-blue-400 hover:text-blue-600 dark:border-white/15 dark:text-white"
              >
                Meine Leistungen
              </a>
            </div>
          </div>
        </section>
        <app-about />
        <app-services />
        <app-projects />
        <app-home-contact />
      </main>
      <app-footer />
    </div>
  `,
})
export class AboutPageComponent implements OnInit {
  constructor(
    private readonly titleService: Title,
    private readonly metaService: Meta,
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Sonja Waldenspuhl | Softwareentwicklung & digitale Lösungen');
    this.metaService.updateTag({
      name: 'description',
      content:
        'Sonja Waldenspuhl: Softwareentwicklerin aus Kiel. Fähigkeiten, Leistungen und ausgewählte digitale Projekte.',
    });
  }
}
