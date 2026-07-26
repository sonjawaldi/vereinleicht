import { DOCUMENT } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutSkillsTableComponent } from './about-skills-table.component';
import { CredentialsComponent } from '../credentials/credentials.component';

@Component({
  selector: 'app-about',
  imports: [CommonModule, AboutSkillsTableComponent, CredentialsComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
  standalone: true,
})
export class AboutComponent implements OnInit, OnDestroy {
  private readonly document = inject(DOCUMENT);
  private previouslyFocusedElement: HTMLElement | null = null;
  age: number = 0;
  showMoreSkills: boolean = false;
  showPodiumsdiskussion: boolean = false;

  ngOnInit() {
    this.age = this.calculateAge(new Date(2002, 10, 16)); // 16.11.2002 (Monat ist 0-basiert)
  }

  calculateAge(birthDate: Date): number {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  @HostListener('document:keydown.escape')
  closePodiumsdiskussion(): void {
    if (!this.showPodiumsdiskussion) return;
    this.showPodiumsdiskussion = false;
    this.document.body.style.overflow = '';
    setTimeout(() => this.previouslyFocusedElement?.focus());
  }

  openPodiumsdiskussion(event: Event): void {
    this.previouslyFocusedElement = event.currentTarget as HTMLElement;
    this.showPodiumsdiskussion = true;
    this.document.body.style.overflow = 'hidden';
    setTimeout(() =>
      this.document.querySelector<HTMLButtonElement>('#podiumsdiskussion-dialog button')?.focus(),
    );
  }

  closeFromBackdrop(event: MouseEvent): void {
    if (event.target === event.currentTarget) this.closePodiumsdiskussion();
  }

  trapDialogFocus(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    const dialog = this.document.getElementById('podiumsdiskussion-dialog');
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

  toggleSkills(): void {
    this.showMoreSkills = !this.showMoreSkills;
  }

  ngOnDestroy(): void {
    this.document.body.style.overflow = '';
  }
}
