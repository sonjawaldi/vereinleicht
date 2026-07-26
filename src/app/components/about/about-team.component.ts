import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TeamMember {
  emoji: string;
  name: string;
  title: string;
  description: string;
  image: string;
  color: string;
}

@Component({
  selector: 'app-about-team',
  template: `
    <div class="mt-12">
      <div class="flex items-center gap-3 mb-8">
        <span class="text-[10px] font-bold tracking-[0.2em] text-blue-500/60 uppercase">
          Mein Team
        </span>
        <div class="h-px flex-grow bg-gray-100 dark:bg-white/5"></div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          *ngFor="let member of teamMembers"
          class="group relative bg-white dark:bg-white/[0.02] border border-gray-50 dark:border-white/[0.03] p-5 rounded-[1.5rem] shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden"
        >
          <div
            [ngClass]="getGlowClasses(member.color)"
            class="absolute -top-10 -right-10 w-32 h-32 blur-3xl rounded-full group-hover:transition-colors duration-500"
          ></div>

          <div class="relative z-10">
            <div
              class="aspect-square rounded-xl bg-gray-50 dark:bg-gray-800 mb-5 overflow-hidden shadow-inner border border-gray-50 dark:border-white/5"
            >
              <img
                [src]="member.image"
                [alt]="member.name"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <h4 class="text-base font-black text-gray-900 dark:text-white mb-2 tracking-tight">
              {{ member.emoji }} {{ member.name }}
            </h4>
            <div
              [ngClass]="getTitleClasses(member.color)"
              class="text-[9px] font-black uppercase tracking-[0.2em] mb-3"
            >
              {{ member.title }}
            </div>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed italic text-sm">
              {{ member.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule],
})
export class AboutTeamComponent {
  teamMembers: TeamMember[] = [
    {
      emoji: '🐱',
      name: 'Mia',
      title: 'Senior Developer',
      description: '„Spezialisiert auf Tastaturtests und spontane Code-Reviews."',
      image: 'mia.jpeg',
      color: 'blue',
    },
    {
      emoji: '🐱🐱',
      name: 'Mia & Sam',
      title: 'UI/UX-Beratung',
      description:
        '„Feedback basiert überwiegend auf Blicken. Positive Bewertung wird durch Schnurren signalisiert."',
      image: 'mia_sam.jpeg',
      color: 'purple',
    },
    {
      emoji: '🐶',
      name: 'Lio',
      title: 'Chief Motivation Officer',
      description:
        '„Verantwortlich für Pausen, Motivation und regelmäßige Spaziergang-Erinnerungen."',
      image: 'lio.jpeg',
      color: 'green',
    },
  ];

  getGlowClasses(color: string): string {
    const glowClasses = {
      blue: 'bg-blue-600/5 group-hover:bg-blue-600/10',
      purple: 'bg-purple-600/5 group-hover:bg-purple-600/10',
      green: 'bg-green-600/5 group-hover:bg-green-600/10',
    };
    return glowClasses[color as keyof typeof glowClasses] || '';
  }

  getTitleClasses(color: string): string {
    const titleClasses = {
      blue: 'text-blue-500',
      purple: 'text-purple-500',
      green: 'text-green-500',
    };
    return titleClasses[color as keyof typeof titleClasses] || '';
  }
}
