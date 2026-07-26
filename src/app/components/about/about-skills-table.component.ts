import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface SkillRow {
  category: string;
  technologies: string;
}

@Component({
  selector: 'app-about-skills-table',
  template: `
    <div id="skills-table">
      <div
        class="overflow-hidden rounded-[2rem] border border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/[0.01] backdrop-blur-sm shadow-sm"
      >
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-gray-100 dark:border-white/5">
                <th
                  class="p-6 text-sm font-black text-gray-900 dark:text-white uppercase tracking-wider"
                >
                  Kategorie
                </th>
                <th
                  class="p-6 text-sm font-black text-gray-900 dark:text-white uppercase tracking-wider"
                >
                  Technologien
                </th>
              </tr>
            </thead>
            <tbody class="text-sm text-gray-600 dark:text-gray-300">
              <tr
                *ngFor="let row of skillRows"
                class="border-b border-gray-100 dark:border-white/5 hover:bg-blue-600/[0.02] dark:hover:bg-blue-600/[0.05] transition-colors"
              >
                <td class="p-6 font-bold text-blue-500">{{ row.category }}</td>
                <td class="p-6">{{ row.technologies }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule],
})
export class AboutSkillsTableComponent {
  skillRows: SkillRow[] = [
    {
      category: 'Frontend',
      technologies: 'Angular, TypeScript, JavaScript, HTML, CSS, Tailwind CSS',
    },
    {
      category: 'Backend',
      technologies: 'Java, Python, Flask, REST APIs',
    },
    {
      category: 'Testing',
      technologies: 'Cypress, Vitest, JUnit',
    },
    {
      category: 'Datenbanken',
      technologies: 'PostgreSQL, MySQL, SQL',
    },
    {
      category: 'DevOps & Deployment',
      technologies: 'Docker, Kubernetes, CI/CD',
    },
    {
      category: 'Tools & Plattformen',
      technologies: 'Git, GitHub, GitLab',
    },
    {
      category: 'Architektur',
      technologies: 'REST, Layered Architecture',
    },
    {
      category: 'Methoden',
      technologies: 'Scrum, Agile Softwareentwicklung',
    },
    {
      category: 'Sprachen',
      technologies: 'Java, Python, TypeScript, JavaScript',
    },
  ];
}
