import { Component, OnInit, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ContactService, describeFormError } from '../../services/contact.service';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact-form.component.html',
})
export class ContactFormComponent implements OnInit {
  private readonly contactService = inject(ContactService);

  /** Vorbefüllter Text aus der Themenauswahl. */
  readonly prefill = input('');

  name = '';
  email = '';
  phone = '';
  organization = '';
  message = '';
  /** Honeypot – für Menschen unsichtbar, Bots füllen ihn aus. */
  website = '';

  readonly sending = signal(false);
  readonly sent = signal(false);
  readonly errorMessage = signal('');
  readonly fieldErrors = signal<Record<string, string>>({});

  ngOnInit(): void {
    this.message = this.prefill();
  }

  submit(): void {
    if (this.sending()) return;

    this.sending.set(true);
    this.errorMessage.set('');
    this.fieldErrors.set({});

    this.contactService
      .sendContact({
        name: this.name,
        email: this.email,
        phone: this.phone,
        organization: this.organization,
        message: this.message,
        website: this.website,
      })
      .subscribe({
        next: () => {
          this.sending.set(false);
          this.sent.set(true);
          this.resetForm();
        },
        error: (error: HttpErrorResponse) => {
          this.sending.set(false);
          const described = describeFormError(error);
          this.errorMessage.set(described.message);
          this.fieldErrors.set(described.fieldErrors);
        },
      });
  }

  private resetForm(): void {
    this.name = '';
    this.email = '';
    this.phone = '';
    this.organization = '';
    this.message = '';
    this.website = '';
  }
}
