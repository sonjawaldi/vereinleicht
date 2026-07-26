import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ServicesComponent } from '../services/services.component';
import { HomeHeroComponent } from './home-hero.component';
import { HomeChallengesComponent } from './home-challenges.component';
import { HomeContactComponent } from './home-contact.component';
import { HomeOfferDialogComponent } from './home-offer-dialog.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    ServicesComponent,
    HomeHeroComponent,
    HomeChallengesComponent,
    HomeContactComponent,
    HomeOfferDialogComponent,
    RouterLink,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(
    private titleService: Title,
    private metaService: Meta,
  ) {}

  ngOnInit(): void {
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
