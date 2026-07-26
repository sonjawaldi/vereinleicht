import { Component, input } from '@angular/core';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  templateUrl: './contact-form.component.html',
})
export class ContactFormComponent {
  readonly subject = input('Neue Kontaktanfrage über die Website');
  readonly message = input('');
}
