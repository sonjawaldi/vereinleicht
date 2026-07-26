import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { HomeOfferDialogComponent } from '../home/home-offer-dialog.component';

@Component({
  selector: 'app-portal',
  standalone: true,
  imports: [RouterLink, HomeOfferDialogComponent],
  templateUrl: './portal.component.html',
})
export class PortalComponent implements OnInit {
  constructor(
    private readonly titleService: Title,
    private readonly metaService: Meta,
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Sonja Waldenspuhl | Verein oder Business');
    this.metaService.updateTag({
      name: 'description',
      content: 'Digitale Lösungen für Vereine und das berufliche Portfolio von Sonja Waldenspuhl.',
    });
  }
}
