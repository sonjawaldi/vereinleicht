import { DOCUMENT } from '@angular/common';
import { Component, HostListener, OnDestroy, inject } from '@angular/core';

@Component({
  selector: 'app-credentials',
  standalone: true,
  templateUrl: './credentials.component.html',
})
export class CredentialsComponent implements OnDestroy {
  private readonly document = inject(DOCUMENT);
  private previouslyFocusedElement: HTMLElement | null = null;
  showEspkuProof = false;

  openProof(event: Event): void {
    this.previouslyFocusedElement = event.currentTarget as HTMLElement;
    this.showEspkuProof = true;
    this.document.body.style.overflow = 'hidden';
    setTimeout(() =>
      this.document.querySelector<HTMLButtonElement>('#espku-proof-dialog button')?.focus(),
    );
  }

  closeProof(): void {
    if (!this.showEspkuProof) return;
    this.showEspkuProof = false;
    this.document.body.style.overflow = '';
    setTimeout(() => this.previouslyFocusedElement?.focus());
  }

  closeFromBackdrop(event: MouseEvent): void {
    if (event.target === event.currentTarget) this.closeProof();
  }

  trapFocus(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    const dialog = this.document.getElementById('espku-proof-dialog');
    const elements = dialog?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    if (!elements?.length) return;
    const first = elements[0];
    const last = elements[elements.length - 1];
    if (keyboardEvent.shiftKey && this.document.activeElement === first) {
      keyboardEvent.preventDefault();
      last.focus();
    } else if (!keyboardEvent.shiftKey && this.document.activeElement === last) {
      keyboardEvent.preventDefault();
      first.focus();
    }
  }

  @HostListener('document:keydown.escape')
  closeOnEscape(): void {
    this.closeProof();
  }

  ngOnDestroy(): void {
    this.document.body.style.overflow = '';
  }
}
