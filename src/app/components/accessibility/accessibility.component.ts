import { Component, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-accessibility',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './accessibility.component.html',
})
export class AccessibilityComponent implements OnInit {
  private readonly title = inject(Title);

  ngOnInit(): void {
    this.title.setTitle('Barrierefreiheit | vereinleicht');
  }
}
