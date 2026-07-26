import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface SkillBadge {
  label: string;
  category: string;
  color: string;
  iconPath: string;
  link?: string;
}

@Component({
  selector: 'app-about-skills-badges',
  template: `
    <div class="mt-12">
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3">
        <a
          *ngFor="let badge of skillBadges"
          [href]="badge.link || '#skills-table'"
          [ngClass]="getClasses(badge.color)"
          class="group p-3 bg-white dark:bg-white/[0.02] border border-gray-50 dark:border-white/[0.03] rounded-2xl hover:shadow-xl transition-all duration-500 flex flex-col items-center text-center"
        >
          <div
            [ngClass]="getIconClasses(badge.color)"
            class="w-8 h-8 mb-3 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                [attr.d]="badge.iconPath"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              />
            </svg>
          </div>
          <div
            [ngClass]="getCategoryClasses(badge.color)"
            class="text-[10px] font-black uppercase tracking-[0.2em] mb-1"
          >
            {{ badge.category }}
          </div>
          <div class="text-gray-900 dark:text-white text-sm font-bold tracking-tight">
            {{ badge.label }}
          </div>
        </a>
      </div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule],
})
export class AboutSkillsBadgesComponent {
  skillBadges: SkillBadge[] = [
    {
      label: 'Software',
      category: 'Entwicklung',
      color: 'blue',
      iconPath: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
    },
    {
      label: 'Vereins-IT',
      category: 'Beratung',
      color: 'purple',
      iconPath:
        'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    },
    {
      label: 'CAU Kiel',
      category: 'Akademisch',
      color: 'green',
      iconPath: 'M12 14l9-5-9-5-9 5 9 5z',
    },
    {
      label: 'Angular',
      category: 'Frontend',
      color: 'yellow',
      iconPath:
        'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    },
    {
      label: 'Flask & More',
      category: 'Backend',
      color: 'orange',
      iconPath:
        'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01',
    },
    {
      label: 'Cypress',
      category: 'Testing',
      color: 'red',
      iconPath: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    },
    {
      label: 'Angular',
      category: 'Zertifikat',
      color: 'blue-cert',
      link: 'zertifikat-sonjawaldenspuhl.pdf',
      iconPath: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    },
  ];

  getClasses(color: string): string {
    const hoverClasses = {
      blue: 'hover:bg-blue-600/[0.02] dark:hover:bg-blue-600/[0.05] hover:border-blue-600/30',
      purple:
        'hover:bg-purple-600/[0.02] dark:hover:bg-purple-600/[0.05] hover:border-purple-600/30',
      green: 'hover:bg-green-600/[0.02] dark:hover:bg-green-600/[0.05] hover:border-green-600/30',
      yellow:
        'hover:bg-yellow-600/[0.02] dark:hover:bg-yellow-600/[0.05] hover:border-yellow-600/30',
      orange:
        'hover:bg-orange-600/[0.02] dark:hover:bg-orange-600/[0.05] hover:border-orange-600/30',
      red: 'hover:bg-red-600/[0.02] dark:hover:bg-red-600/[0.05] hover:border-red-600/30',
      'blue-cert':
        'bg-blue-600/5 dark:bg-blue-600/10 border-blue-600/20 hover:bg-blue-600 hover:border-blue-600',
    };
    return hoverClasses[color as keyof typeof hoverClasses] || '';
  }

  getIconClasses(color: string): string {
    const iconClasses = {
      blue: 'bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white',
      purple: 'bg-purple-500/10 text-purple-400 group-hover:bg-purple-500 group-hover:text-white',
      green: 'bg-green-500/10 text-green-400 group-hover:bg-green-500 group-hover:text-white',
      yellow: 'bg-yellow-500/10 text-yellow-400 group-hover:bg-yellow-500 group-hover:text-white',
      orange: 'bg-orange-500/10 text-orange-400 group-hover:bg-orange-500 group-hover:text-white',
      red: 'bg-red-500/10 text-red-400 group-hover:bg-red-500 group-hover:text-white',
      'blue-cert': 'bg-white/10 group-hover:bg-white/20',
    };
    return iconClasses[color as keyof typeof iconClasses] || '';
  }

  getCategoryClasses(color: string): string {
    const categoryClasses = {
      blue: 'text-blue-500/80',
      purple: 'text-purple-500/80',
      green: 'text-green-500/80',
      yellow: 'text-yellow-500/80',
      orange: 'text-orange-500/80',
      red: 'text-red-500/80',
      'blue-cert': 'text-blue-500 group-hover:text-white',
    };
    return categoryClasses[color as keyof typeof categoryClasses] || '';
  }
}
