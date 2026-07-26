import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslatePageDirective } from './directives/translate-page.directive';
import { CookieConsentComponent } from './components/cookie-consent/cookie-consent.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslatePageDirective, CookieConsentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'vereinleicht';
}
