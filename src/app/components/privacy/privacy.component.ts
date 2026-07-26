import { Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './privacy.component.html',
})
export class PrivacyComponent implements OnInit {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle('Datenschutz | vereinleicht');
    this.meta.updateTag({
      name: 'description',
      content: 'Datenschutzerklärung der Website von vereinleicht.',
    });
    this.meta.updateTag({ name: 'robots', content: 'noindex, follow' });
  }
}
