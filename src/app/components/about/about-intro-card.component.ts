import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-about-intro-card',
  template: `
    <div class="lg:col-span-7 order-1 lg:order-2">
      <div class="relative mb-8">
        <div
          class="relative z-10 bg-gray-50/50 dark:bg-white/[0.01] border border-gray-100 dark:border-white/[0.03] p-5 rounded-2xl backdrop-blur-sm"
        >
          <div class="mb-6">
            <div class="flex items-center gap-3 mb-3">
              <span class="text-[10px] font-bold tracking-[0.2em] text-blue-500/60 uppercase">
                Über mich
              </span>
              <div class="h-px flex-grow bg-gray-100 dark:bg-white/5"></div>
            </div>
            <h2 class="text-lg md:text-xl font-bold text-gray-900 dark:text-white leading-tight">
              Informatik-Studentin & Softwareentwicklerin
            </h2>
          </div>
          <div class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed space-y-5">
            <p>
              Hallo, ich bin
              <span class="text-gray-900 dark:text-white font-semibold">Sonja Waldenspuhl</span>.
              Ich bin {{ age }} Jahre alt, studiere Informatik an der CAU Kiel und arbeite nebenbei
              als Entwicklerin bei der REWE Digital GmbH.
            </p>
            <p>
              Ich mag klare, nutzerfreundliche Lösungen – ob im Studium, im Job oder in eigenen
              Projekten. Technik soll Menschen helfen und Spaß machen. In meiner Freizeit singe ich
              gern und tanke dabei neue Energie und Inspiration.
            </p>
            <p>
              Ich engagiere mich ehrenamtlich – unter anderem habe ich an einer Podiumsdiskussion
              der ESPKU teilgenommen und bin Mitglied der Fachschaft Informatik.
            </p>
            <p>
              Als Softwareentwicklerin unterstütze ich Vereine dabei, ihre wichtige Arbeit digital
              sichtbar und leicht zugänglich zu machen. Mein Fokus liegt auf verständlichen,
              zuverlässigen Lösungen, die auch im ehrenamtlichen Alltag gut funktionieren –
              bezahlbar, einfach zu pflegen und ohne unnötigen Fachjargon.
            </p>
          </div>
        </div>
        <div
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-600/5 blur-[80px] -z-0"
        ></div>
      </div>
    </div>
  `,
  standalone: true,
})
export class AboutIntroCardComponent {
  @Input() age: number = 0;
}
