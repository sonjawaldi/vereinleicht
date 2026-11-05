import { ViewportScroller } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ServicesComponent } from '../services/services.component';
import { HomeHeroComponent } from './home-hero.component';
import { HomeChallengesComponent } from './home-challenges.component';
import { HomeProcessComponent } from './home-process.component';
import { HomeAboutComponent } from './home-about.component';
import { HomeMotivationComponent } from './home-motivation.component';
import { HomeOfferComponent } from './home-offer.component';
import { HomeFaqComponent } from './home-faq.component';
import { HomeContactComponent } from './home-contact.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    ServicesComponent,
    HomeHeroComponent,
    HomeChallengesComponent,
    HomeProcessComponent,
    HomeAboutComponent,
    HomeMotivationComponent,
    HomeOfferComponent,
    HomeFaqComponent,
    HomeContactComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private readonly viewportScroller = inject(ViewportScroller);

  constructor(
    private titleService: Title,
    private metaService: Meta,
  ) {}

  ngOnInit(): void {
    // Anker-Links landen direkt unter der festen Kopfleiste, nicht dahinter.
    this.viewportScroller.setOffset(() => [
      0,
      document.querySelector<HTMLElement>('.site-header')?.offsetHeight ?? 0,
    ]);

    this.titleService.setTitle('vereinleicht | Digitale Lösungen für Vereine');
    this.metaService.updateTag({
      name: 'description',
      content:
        'Websites, Mitgliederportale und digitale Prozesse speziell für Vereine – barrierearm, datenschutzbewusst und einfach zu pflegen.',
    });
    this.metaService.updateTag({
      name: 'keywords',
      content:
        'Vereinswebsite, Mitgliederportal, Vereinssoftware, Softwareentwicklung, Barrierefreiheit, Kiel',
    });
    this.metaService.updateTag({
      property: 'og:title',
      content: 'vereinleicht | Digitale Lösungen für Vereine',
    });
    this.metaService.updateTag({
      property: 'og:description',
      content: 'Barrierearme, datenschutzbewusste digitale Lösungen speziell für Vereine.',
    });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
    this.metaService.updateTag({
      property: 'og:url',
      content: 'https://vereinleicht.de/',
    });
  }
}
