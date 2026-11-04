import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  effect,
  inject,
} from '@angular/core';
import { LanguageService } from '../services/language.service';

const EN: Record<string, string> = {
  Start: 'Home',
  Herausforderungen: 'Challenges',
  Leistungen: 'Services',
  Projekte: 'Projects',
  'Über mich': 'About me',
  Übersicht: 'Overview',
  Motivation: 'Motivation',
  Nachweise: 'Credentials',
  Kontakt: 'Contact',
  'Sprache auswählen': 'Select language',
  'Deutsch auswählen': 'Select German',
  'Englisch auswählen': 'Select English',
  Hauptnavigation: 'Main navigation',
  'Mobile Hauptnavigation': 'Mobile main navigation',
  'Farbschema wechseln': 'Toggle color scheme',
  'Navigation öffnen oder schließen': 'Open or close navigation',
  'Digitale Lösungen für Vereine': 'Digital solutions for associations',
  'Digitale Lösungen für': 'Digital solutions for',
  Vereine: 'associations',
  'Websites, Portale und digitale Prozesse – mit persönlicher Erfahrung im Bereich seltene Erkrankungen und Verständnis für ehrenamtliche Strukturen.':
    'Websites, portals and digital processes – backed by personal experience with rare diseases and an understanding of volunteer-led organisations.',
  'Barrierearm, modern und einfach – für jedes Alter.':
    'Accessible, modern and easy to use – for every age.',
  'Leistungen ansehen': 'View services',
  'Projekt besprechen': 'Discuss a project',
  'Herausforderungen im Vereinsalltag': 'Challenges in everyday association work',
  'Kommt Ihnen das bekannt vor?': 'Does this sound familiar?',
  'Welche dieser Aussagen beschreibt gerade Ihren Vereinsalltag?':
    'Which of these statements best describes your organisation right now?',
  'Wählen Sie aus, was Ihren Vereinsalltag gerade beschäftigt.':
    'Select the topics currently affecting your organisation.',
  'Typische Herausforderungen im Vereinsalltag auswählen':
    'Select typical challenges in everyday association work',
  'Unsere Website ist seit Jahren nicht aktualisiert und funktioniert auf dem Smartphone nur eingeschränkt.':
    'Our website has not been updated in years and only works to a limited extent on smartphones.',
  'Unsere Mitgliederverwaltung besteht aus mehreren Excel-Listen, die niemand vollständig überblickt.':
    'Our membership administration consists of several spreadsheets that nobody can fully keep track of.',
  'Uns fehlt technisches Know-how, um gute Entscheidungen zu Website und Software zu treffen.':
    'We lack the technical expertise to make good decisions about our website and software.',
  'Bei einem Wechsel im Vorstand gehen Zugänge, Abläufe und wichtiges Wissen verloren.':
    'When board members change, access credentials, processes and important knowledge are lost.',
  'Dann schauen wir uns gemeinsam an, was bleiben kann und wo eine Modernisierung sinnvoll ist.':
    'Together, we will assess what can stay and where modernisation makes sense.',
  'Ich kann Ihre Prozesse analysieren und prüfen, welche Abläufe sich sinnvoll digitalisieren lassen.':
    'I can analyse your processes and identify which workflows can be digitised effectively.',
  'Ich übersetze technische Möglichkeiten in verständliche Entscheidungen und begleite Sie bei der Umsetzung.':
    'I turn technical options into clear decisions and support you through implementation.',
  'Gemeinsam schaffen wir klare Strukturen, damit Zugänge, Abläufe und Wissen dauerhaft erhalten bleiben.':
    'Together, we will create clear structures so access, processes and knowledge are retained.',
  'Das klingt nach einem Projekt, bei dem ich Sie unterstützen kann.':
    'This sounds like a project I can help you with.',
  'Auf Basis Ihrer Auswahl können wir uns gemeinsam': 'Based on your selection, we can look at',
  'Projekt besprechen →': 'Discuss a project →',
  'Finde jetzt deine individuelle Lösung und lasse dich beraten.':
    'Find your tailored solution and get advice.',
  Abschicken: 'Submit',
  'Dein nächster Schritt': 'Your next step',
  'Hol dir deine individuelle Lösung': 'Get your tailored solution',
  'Erzähl mir, was dein Verein braucht – gemeinsam finden wir eine Lösung, die wirklich zu euch passt. Nimm jetzt unverbindlich Kontakt mit mir auf.':
    'Tell me what your organisation needs – together we will find a solution that truly fits. Get in touch with no obligation.',
  'E-Mail schreiben': 'Write an email',
  'Kontaktformular ausfüllen': 'Complete contact form',
  'Fenster schließen': 'Close window',
  'Ich kenne diese Herausforderungen aus eigener Erfahrung und entwickle Lösungen, die dazu passen:':
    'I know these challenges from personal experience and develop solutions that fit:',
  'bezahlbar, einfach zu pflegen und langfristig tragfähig.':
    'affordable, easy to maintain and sustainable.',
  'Digitale Lösungen, die im Alltag funktionieren': 'Digital solutions that work in everyday life',
  'Speziell für Vereine – verständlich beraten, zuverlässig umgesetzt und im ehrenamtlichen Alltag langfristig nutzbar.':
    'Designed for associations – clear advice, reliable implementation and built for long-term use by volunteer teams.',
  Analyse: 'Analysis',
  'Bestandsaufnahme Ihrer aktuellen Prozesse und Systeme.':
    'Assessment of your current processes and systems.',
  Konzept: 'Concept',
  'Gemeinsame Planung von Architektur und Lösungsansatz.':
    'Joint planning of the architecture and solution approach.',
  Umsetzung: 'Implementation',
  'Entwicklung Ihrer individuellen Softwarelösung.':
    'Development of your individual software solution.',
  Wartung: 'Maintenance',
  'Langfristige Betreuung und zuverlässiger Support.':
    'Long-term maintenance and reliable support.',
  'Wie aus persönlicher Erfahrung eine hilfreiche digitale Lösung für Betroffene und Vereine entsteht.':
    'How personal experience becomes a helpful digital solution for people affected and associations.',
  Praxisbeispiel: 'Case study',
  'Von Betroffenen für Betroffene': 'By people affected, for people affected',
  'Das Portal macht Informationen rund um Phenylketonurie leichter zugänglich und bereitet komplexe Inhalte verständlich auf. Meine eigene PKU-Erfahrung fließt direkt in Konzeption und Bedienung ein.':
    'The portal makes information about phenylketonuria easier to access and presents complex topics clearly. My own experience with PKU directly informs its concept and usability.',
  'Für Betroffene': 'For people affected',
  'Verständliche Informationen und einfache Nutzung': 'Clear information and easy use',
  'Für Vereine': 'For associations',
  'Digitales Wissen zugänglich vermitteln': 'Make digital knowledge accessible',
  'Projekt entdecken': 'Explore project',
  'Warum mir Vereinsarbeit am Herzen liegt': 'Why association work matters to me',
  'Ich lebe seit meiner Geburt mit Phenylketonurie – einer seltenen Stoffwechselerkrankung, die den Alltag oft kompliziert macht, auch wenn man von außen nichts sieht. Es gibt Phasen, in denen man sich mit einer seltenen Erkrankung allein fühlt: wenn Ärzte die Krankheit kaum kennen, wenn Standardlösungen nicht passen oder wenn niemand in der Nähe genau weiß, wie es sich anfühlt.':
    'I have lived with phenylketonuria since birth – a rare metabolic condition that often complicates daily life, even though it is invisible to others. There are times when living with a rare disease can feel lonely: when doctors barely know the condition, standard solutions do not fit, or nobody nearby truly understands what it feels like.',
  'Was mir in diesen Momenten am meisten geholfen hat, war die Gemeinschaft. Der Austausch mit anderen Betroffenen und das Gefühl, verstanden zu werden, ohne alles erklären zu müssen, haben mir gezeigt, wie wichtig Vereine und Selbsthilfegruppen für Menschen mit seltenen Erkrankungen sind. Ein guter Verein ist mehr als eine Organisation. Er kann ein Anker sein, wenn andere Anker fehlen.':
    'What helped me most in those moments was community. Connecting with others affected and feeling understood without having to explain everything showed me how important associations and support groups are for people with rare diseases. A good association is more than an organisation. It can be an anchor when other anchors are missing.',
  'Genau deshalb möchte ich Vereine und Organisationen in diesem Bereich mit meiner Arbeit unterstützen. Damit die Energie, die sonst in umständliche Technik oder veraltete Systeme fließt, wieder dort ankommt, wo sie hingehört: bei den Menschen, die diese Gemeinschaft brauchen.':
    'That is exactly why I want my work to support associations and organisations in this field, so energy otherwise spent on cumbersome technology or outdated systems can go where it belongs: to the people who need this community.',
  'für Vereine': 'for associations',
  'Informatik-Studentin & Softwareentwicklerin': 'Computer science student & software developer',
  'Hallo, ich bin': 'Hello, I am',
  'Jahre alt, studiere Informatik an der CAU Kiel und arbeite nebenbei als Entwicklerin bei der REWE Digital GmbH.':
    'years old, study computer science at Kiel University and work part-time as a developer at REWE Digital GmbH.',
  'Ich mag klare, nutzerfreundliche Lösungen – ob im Studium, im Job oder in eigenen Projekten. Technik soll Menschen helfen und Spaß machen. In meiner Freizeit singe ich gern und tanke dabei neue Energie und Inspiration.':
    'I like clear, user-friendly solutions – whether at university, at work or in my own projects. Technology should help people and be enjoyable. In my free time, I love singing and find new energy and inspiration in it.',
  'Ich engagiere mich ehrenamtlich – unter anderem habe ich an einer':
    'I volunteer as well – among other things, I took part in an',
  'Podiumsdiskussion der ESPKU': 'ESPKU panel discussion',
  'teilgenommen und bin Mitglied der Fachschaft Informatik.':
    'and I am a member of the computer science student council.',
  'Als Softwareentwicklerin unterstütze ich Vereine dabei, ihre':
    'As a software developer, I help associations make their',
  'wichtige Arbeit digital sichtbar und leicht zugänglich zu machen. Mein Fokus liegt auf':
    'important work visible and easily accessible online. I focus on',
  'verständlichen, zuverlässigen Lösungen, die auch im ehrenamtlichen Alltag gut funktionieren –':
    'clear, reliable solutions that work well in volunteer-led day-to-day operations –',
  'bezahlbar, einfach zu pflegen und ohne unnötigen Fachjargon.':
    'affordable, easy to maintain and without unnecessary jargon.',
  Fähigkeiten: 'Skills',
  Entwicklung: 'Development',
  Beratung: 'Consulting',
  Akademisch: 'Academic',
  Mehr: 'More',
  Weniger: 'Less',
  'Fähigkeiten im Überblick': 'Skills overview',
  Kategorie: 'Category',
  Technologien: 'Technologies',
  Datenbanken: 'Databases',
  'Tools & Plattformen': 'Tools & platforms',
  Architektur: 'Architecture',
  Methoden: 'Methods',
  'Agile Softwareentwicklung': 'Agile software development',
  Sprachen: 'Languages',
  'Mein Team': 'My team',
  'UI/UX-Beratung': 'UI/UX consulting',
  '„Spezialisiert auf Tastaturtests und spontane Code-Reviews.“':
    '“Specialising in keyboard testing and spontaneous code reviews.”',
  '„Feedback basiert überwiegend auf Blicken. Positive Bewertung wird durch Schnurren signalisiert.“':
    '“Feedback is mostly given through looks. Positive ratings are signalled by purring.”',
  '„Verantwortlich für Pausen, Motivation und regelmäßige Spaziergang-Erinnerungen.“':
    '“Responsible for breaks, motivation and regular walk reminders.”',
  'Kompetenz und Engagement': 'Expertise and commitment',
  Fachkompetenz: 'Professional expertise',
  'Skill-Zertifikat': 'Skills certificate',
  'Zertifikat direkt im Browser ansehen.': 'View the certificate directly in your browser.',
  'Nachweis öffnen →': 'Open credential →',
  Engagement: 'Commitment',
  'ESPKU-Podiumsdiskussion': 'ESPKU panel discussion',
  'Teilnahmenachweis geschützt ansehen.': 'View the protected proof of participation.',
  'Nachweis ansehen →': 'View credential →',
  'Ansicht schließen': 'Close view',
  'Bereit für Ihre Idee': 'Ready for your idea',
  'Machen wir Ihren Verein digital stärker.': 'Let’s strengthen your association digitally.',
  'Sie haben eine Idee, ein konkretes Problem oder wissen noch nicht genau, wo Sie anfangen sollen? Schreiben Sie mir – wir finden gemeinsam den passenden nächsten Schritt.':
    'Do you have an idea, a specific problem, or are you unsure where to start? Send me a message – together we will find the right next step.',
  'Vorteile der Kontaktaufnahme': 'Benefits of getting in touch',
  Unverbindlich: 'No obligation',
  Persönlich: 'Personal',
  Verständlich: 'Clear',
  'Direkter Kontakt': 'Get in touch',
  'Erzählen Sie mir von Ihrem Projekt.': 'Tell me about your project.',
  'Öffnen Sie das Kontaktformular und senden Sie mir Ihre Anfrage in wenigen Schritten.':
    'Open the contact form and send your enquiry in just a few steps.',
  'Kontaktformular öffnen': 'Open contact form',
  'Kontakt per E-Mail aufnehmen': 'Get in touch by email',
  'Oder direkt per E-Mail schreiben': 'Or write an email directly',
  'Kontaktformular schließen': 'Close contact form',
  'Kontakt aufnehmen': 'Get in touch',
  'Wie möchten Sie Kontakt aufnehmen?': 'How would you like to get in touch?',
  'Wählen Sie einfach den Weg, der für Sie am besten passt.':
    'Simply choose the option that suits you best.',
  'Kontaktart auswählen': 'Choose contact method',
  Kontaktformular: 'Contact form',
  'Schreiben Sie direkt eine E-Mail. Die Adresse bleibt immer sichtbar – auch wenn Sie das Kontaktformular verwenden.':
    'Send an email directly. The address always remains visible – even when you use the contact form.',
  'E-Mail schreiben an': 'Write an email to',
  'Kostenloses und unverbindliches Erstgespräch': 'Free, no-obligation initial consultation',
  'E-Mail-Adresse *': 'Email address *',
  'Dein Name': 'Your name',
  'Telefonnummer *': 'Phone number *',
  'Deine Telefonnummer': 'Your phone number',
  Verein: 'Association',
  '(optional)': '(optional)',
  'Ihre Nachricht *': 'Your message *',
  'Nachricht direkt senden': 'Send message',
  'Ihre Angaben werden ausschließlich zum Versand dieser Nachricht verwendet.':
    'Your details are used solely to send this message.',
  'Wird gesendet …': 'Sending …',
  'Bitte prüfen Sie die markierten Felder.': 'Please check the highlighted fields.',
  'Bitte einen Namen angeben.': 'Please enter a name.',
  'Name muss mindestens 2 Zeichen lang sein.': 'Name must be at least 2 characters long.',
  'Bitte eine E-Mail-Adresse angeben.': 'Please enter an email address.',
  'Bitte eine gültige E-Mail-Adresse angeben.': 'Please enter a valid email address.',
  'Bitte eine Telefonnummer angeben.': 'Please enter a phone number.',
  'Bitte eine Nachricht eingeben.': 'Please enter a message.',
  'Nachricht muss mindestens 10 Zeichen lang sein.': 'Message must be at least 10 characters long.',
  'Vielen Dank für Ihre Nachricht. Ich melde mich zeitnah bei Ihnen.':
    'Thank you for your message. I will get back to you shortly.',
  'Digitale Lösungen speziell für Vereine': 'Digital solutions for associations',
  Impressum: 'Legal notice',
  'Alle Rechte vorbehalten.': 'All rights reserved.',
  Barrierefreiheit: 'Accessibility',
  'Zum Hauptinhalt springen': 'Skip to main content',
  'Diese Website informiert über digitale Beratungs- und Entwicklungsleistungen für Vereine. Interessierte können die Leistungen und Projekte kennenlernen und über E-Mail oder ein Kontaktformular eine unverbindliche Anfrage senden.':
    'This website provides information about digital consulting and development services for associations. Visitors can learn about services and projects and send a no-obligation enquiry by email or contact form.',
  'Barrierefreie Nutzung': 'Accessible use',
  'Die Website ist für die Bedienung mit Tastatur und assistiven Technologien ausgelegt. Sie bietet eine logische Überschriftenstruktur, sichtbare Fokusmarkierungen, beschriftete Formulare, Alternativtexte, vergrößerbare Inhalte, anpassbare Farbdarstellung und eine reduzierte Darstellung von Bewegungen entsprechend den Geräteeinstellungen.':
    'The website is designed for keyboard operation and assistive technologies. It provides a logical heading structure, visible focus indicators, labelled forms, alternative text, resizable content, adaptable colours and reduced motion according to device settings.',
  'Stand der Vereinbarkeit': 'Compliance status',
  'Ziel ist die Vereinbarkeit mit den Anforderungen des Barrierefreiheitsstärkungsgesetzes und der Verordnung zum Barrierefreiheitsstärkungsgesetz auf Grundlage der europäischen Norm EN 301 549 und WCAG 2.2 auf Konformitätsstufe AA. Die Website wird bei Änderungen erneut geprüft.':
    'The goal is compliance with the German Accessibility Strengthening Act and its implementing ordinance, based on the European standard EN 301 549 and WCAG 2.2 at conformance level AA. The website is reviewed again when changes are made.',
  'Stand: 22. Juli 2026': 'Last updated: 22 July 2026',
  'Barriere melden': 'Report an accessibility barrier',
  'Falls Sie auf eine Barriere stoßen oder Informationen in einer anderen zugänglichen Form benötigen, schreiben Sie bitte an':
    'If you encounter an accessibility barrier or need information in another accessible format, please email',
  '. Bitte nennen Sie möglichst die betroffene Seite und beschreiben Sie das Problem.':
    '. Please identify the affected page and describe the problem where possible.',
  Marktüberwachungsbehörde: 'Market surveillance authority',
  'Zuständig ist die Marktüberwachungsstelle der Länder für die Barrierefreiheit von Produkten und Dienstleistungen (MLBF AöR). Informationen und das Kontaktformular für Verbraucherinnen und Verbraucher finden Sie auf der':
    'The competent authority is the Market Surveillance Authority of the German Federal States for the Accessibility of Products and Services (MLBF). Information and the consumer contact form are available on the',
  'Website der MLBF': 'MLBF website',
  'Angaben gemäß § 5 TMG': 'Information pursuant to Section 5 TMG',
  'Seite nicht gefunden': 'Page not found',
  'Die von Ihnen gesuchte Seite existiert leider nicht oder wurde verschoben.':
    'The page you are looking for does not exist or has been moved.',
  'Zurück zur Startseite': 'Back to home page',
  "So läuft's": 'How it works',
  Fragen: 'Questions',
  'Meldet euch': 'Get in touch',
  'Hallo, liebe Vereine!': 'Hello, associations!',
  'Mehr Zeit für das, was euren Verein': 'More time for what moves your',
  'bewegt.': 'association.',
  'Ich bringe eure Website, die Mitgliederverwaltung und eure täglichen Abläufe in eine Struktur, die alle verstehen – persönlich, barrierearm und ohne Fachchinesisch.':
    'I bring your website, membership administration and daily processes into a structure everyone understands – personal, accessible and free of jargon.',
  'Erstgespräch vereinbaren': 'Arrange an initial call',
  'Was ich für euch mache': 'What I do for you',
  'Sonja Waldenspuhl lacht am Strand': 'Sonja Waldenspuhl laughing on a beach',
  'Vereins-Websites kostenlos': 'association websites for free',
  'Hi, ich bin Sonja!': "Hi, I'm Sonja!",
  'Eure persönliche Ansprechpartnerin für digitale Vereinsarbeit.':
    'Your personal contact for digital association work.',
  'Ehrlich gesagt …': 'Honestly …',
  'Kennt ihr das?': 'Sound familiar?',
  'Diese Zettel hängen in fast jedem Vereinsheim. Welcher davon könnte bei euch hängen? Tippt an, was passt.':
    'These notes hang in almost every clubhouse. Which one could be hanging in yours? Tap whatever fits.',
  'Trifft bei uns zu:': 'Applies to us:',
  'Kennen wir!': 'We know this!',
  'Auch bei euch?': 'You too?',
  '„Unsere Website ist von 2014.“': '“Our website is from 2014.”',
  'Seit Jahren nicht aktualisiert – und auf dem Handy kaum zu bedienen.':
    'Not updated in years – and barely usable on a phone.',
  'Wir schauen gemeinsam, was bleiben kann und wo sich eine Modernisierung lohnt.':
    'Together, we look at what can stay and where modernising pays off.',
  '„Welche Excel-Liste ist die aktuelle?“': '“Which spreadsheet is the current one?”',
  'Die Mitglieder stehen in mehreren Listen – und niemand hat den Überblick.':
    'Members are spread across several lists – and nobody has the full picture.',
  'Ich prüfe mit euch, welche Abläufe sich sinnvoll digitalisieren lassen.':
    'I check with you which processes are worth digitising.',
  '„Kennt sich jemand mit Technik aus?“': '“Does anyone understand the tech?”',
  'Euch fehlt das Know-how, um gute Entscheidungen zu Website und Software zu treffen.':
    'You lack the expertise to make good decisions about your website and software.',
  'Ich übersetze Technik in verständliche Entscheidungen und begleite die Umsetzung.':
    'I turn technology into clear decisions and support the implementation.',
  '„Wo sind die Zugangsdaten hin?“': '“Where did the login details go?”',
  'Beim Vorstandswechsel gehen Zugänge, Abläufe und wichtiges Wissen verloren.':
    'When the board changes, logins, processes and important knowledge get lost.',
  'Wir schaffen klare Strukturen, damit Zugänge und Wissen im Verein bleiben.':
    'We create clear structures so logins and knowledge stay in the association.',
  'Ich kenne diese Herausforderungen aus eigener Erfahrung – und baue Lösungen, die dazu passen: bezahlbar, einfach zu pflegen und langfristig tragfähig.':
    'I know these challenges from personal experience – and build solutions that fit: affordable, easy to maintain and sustainable.',
  'Zeig mir die Lösung': 'Show me the solution',
  'Vier Dinge, die euch das Vereinsleben leichter machen':
    'Four things that make association life easier',
  'Von der ersten Bestandsaufnahme bis zur langfristigen Betreuung – pragmatisch, nachvollziehbar und passend zu eurem Ehrenamt.':
    'From the first assessment to long-term support – pragmatic, transparent and suited to your volunteer work.',
  'Schritt eins': 'Step one',
  'Vereins-Check': 'Association check',
  'Wir sortieren gemeinsam Ziele, Zuständigkeiten und Werkzeuge – und machen den nächsten Schritt klar.':
    'Together we sort out goals, responsibilities and tools – and make the next step clear.',
  'Euer Auftritt': 'Your presence',
  Vereinswebsite: 'Association website',
  'Ein moderner, barrierearmer Auftritt, den euer Team selbst aktuell halten kann.':
    'A modern, accessible website your team can keep up to date itself.',
  'Weniger Zettel': 'Less paper',
  'Mitglieder & Abläufe': 'Members & processes',
  'Klare Prozesse für Anfragen, Beitritte, Termine, Dokumente und eure interne Zusammenarbeit.':
    'Clear processes for enquiries, new members, dates, documents and your internal collaboration.',
  'Auf Dauer': 'For the long run',
  'Sicher weiterarbeiten': 'Keep working safely',
  'Updates, Dokumentation, Übergaben und erreichbarer Support für euren Vereinsalltag.':
    'Updates, documentation, handovers and reachable support for your everyday work.',
  'Zusammenarbeit auf Augenhöhe': 'Working together as equals',
  "So läuft's bei uns": 'How we work together',
  'Wir starten mit dem, was schon da ist, und vereinfachen nur, was wirklich Zeit kostet – mit fester Ansprechpartnerin, verständlichen Entscheidungen und einer sauberen Übergabe an euer Team.':
    'We start with what already exists and only simplify what really costs time – with one fixed contact, clear decisions and a clean handover to your team.',
  Kennenlernen: 'Getting to know each other',
  'Ein kostenloses Erstgespräch – ich höre zu, was euren Verein bewegt.':
    'A free initial call – I listen to what matters to your association.',
  'bei Kaffee oder per Video': 'over coffee or by video',
  'Was ist schon da, was fehlt, was kostet euch unnötig Zeit?':
    'What already exists, what is missing, what wastes your time?',
  'Website und Abläufe entstehen Schritt für Schritt und immer mit euch abgestimmt.':
    'Website and processes take shape step by step, always agreed with you.',
  'Übergabe & Support': 'Handover & support',
  'Verständliche Einweisung, Dokumentation und Hilfe, wenn ihr sie braucht.':
    'Clear onboarding, documentation and help when you need it.',
  'Sonja Waldenspuhl hockt lachend im Dünengras am Strand':
    'Sonja Waldenspuhl crouching and laughing in the dune grass on a beach',
  'Ehrenamtlich engagiert: Podiumsdiskussion auf der E.S.PKU-Konferenz 2025':
    'Volunteer work: panel discussion at the 2025 E.S.PKU conference',
  'Nachweis ansehen': 'View credential',
  'Teilnahmebescheinigung der E.S.PKU-Konferenz 2025':
    'Certificate of attendance, 2025 E.S.PKU conference',
  'Teilnahmebescheinigung der E.S.PKU-Konferenz 2025 in Hamburg für Sonja Waldenspuhl mit dem Vermerk, dass sie an einer Podiumsdiskussion teilgenommen hat':
    'Certificate of attendance for Sonja Waldenspuhl at the 2025 E.S.PKU conference in Hamburg, noting that she took part in a panel discussion',
  'Das bin ich!': "That's me!",
  'Hi, ich bin Sonja.': "Hi, I'm Sonja.",
  'Ich bin eure persönliche Ansprechpartnerin für digitale Vereinsarbeit. Die typischen Stolpersteine im Verein kenne ich aus eigener Erfahrung – deshalb baue ich nichts, was nach der Übergabe niemand mehr bedienen kann.':
    'I am your personal contact for digital association work. I know the typical stumbling blocks from personal experience – so I build nothing that nobody can operate after the handover.',
  'Eine feste Ansprechpartnerin statt wechselnder Hotline':
    'One fixed contact instead of a changing hotline',
  'Verständliche Sprache statt Fachchinesisch': 'Plain language instead of jargon',
  'Lösungen, die auch nach dem Vorstandswechsel funktionieren':
    'Solutions that still work after the board changes',
  Kennenlernangebot: 'Introductory offer',
  'Die ersten 3 Vereins-Websites mache ich kostenlos.':
    'I build the first 3 association websites for free.',
  'Damit euer Verein online gefunden wird – von neuen Mitgliedern, Besucher:innen und Unterstützer:innen. Modern, fürs Handy optimiert und bei Google sichtbar.':
    'So your association can be found online – by new members, visitors and supporters. Modern, optimised for phones and visible on Google.',
  'Noch 2 von 3 Plätzen frei': '2 of 3 places still available',
  'Jetzt unverbindlich Termin sichern': 'Book a no-obligation appointment',
  'Das Kleingedruckte – ganz groß': 'The small print – in large type',
  'Einmalige, kostenlose Erstellung im Rahmen meiner Portfolio-Aktion':
    'One-off, free creation as part of my portfolio campaign',
  'Ein dezenter Hinweis im Footer, dass die Website von mir ist':
    'A discreet footer note that I made the website',
  'Domain und Hosting bezahlt ihr selbst': 'You pay for domain and hosting yourselves',
  'Bis zu 5 Seiten – ohne Sonderfunktionen wie Mitgliederverwaltung, Portale oder Buchungssysteme':
    'Up to 5 pages – without special features such as membership administration, portals or booking systems',
  'Nicht für größere Organisationen und Verbände oder Websites mit hohem Funktions- oder Verwaltungsaufwand':
    'Not for larger organisations and federations or websites with high functional or administrative effort',
  'Gut zu wissen': 'Good to know',
  'Eure Fragen': 'Your questions',
  'Was kostet die Website im Kennenlernangebot?':
    'What does the website cost in the introductory offer?',
  'Für die ersten drei Vereine ist die Erstellung kostenlos. Ihr übernehmt nur die Kosten für Domain und Hosting.':
    'For the first three associations, creation is free. You only cover domain and hosting costs.',
  'Wie viele Seiten sind enthalten?': 'How many pages are included?',
  'Bis zu 5 Seiten. Sonderfunktionen wie Mitgliederverwaltung, Portale oder Buchungssysteme sind im Kennenlernangebot nicht enthalten.':
    'Up to 5 pages. Special features such as membership administration, portals or booking systems are not part of the introductory offer.',
  'Können wir die Website selbst pflegen?': 'Can we maintain the website ourselves?',
  'Ja. Die Website ist so gebaut, dass euer Team sie selbst aktuell halten kann. Bei der Übergabe bekommt ihr eine verständliche Einweisung und eine Dokumentation.':
    'Yes. The website is built so your team can keep it up to date. At handover you get clear onboarding and documentation.',
  'Steht irgendwo, dass die Seite von vereinleicht ist?':
    'Does it say anywhere that the site is by vereinleicht?',
  'Ja, im Footer steht ein dezenter Hinweis, dass die Website von mir erstellt wurde. Das gehört zum Kennenlernangebot dazu.':
    'Yes, a discreet footer note says that I created the website. That is part of the introductory offer.',
  'Bereit für eure Idee?': 'Ready for your idea?',
  'Lasst uns euren Verein digital stärker machen.': "Let's strengthen your association digitally.",
  'Ihr habt eine Idee, ein konkretes Problem oder wisst noch nicht, wo ihr anfangen sollt? Schreibt mir einfach – wir finden gemeinsam den passenden nächsten Schritt.':
    'Do you have an idea, a specific problem, or not know where to start? Just write to me – together we will find the right next step.',
  'Direkt per E-Mail': 'Directly by email',
  'Beispiel-Unterhaltung': 'Example conversation',
  'Euer Verein': 'Your association',
  'Hallo Sonja, unsere Website ist ziemlich alt. Wo fangen wir am besten an?':
    'Hello Sonja, our website is pretty old. Where should we start?',
  'Hallo ihr! Am besten mit einem kurzen Kennenlernen – unverbindlich, persönlich und verständlich.':
    'Hello! Best with a short introduction – no obligation, personal and clear.',
  'Digitale Lösungen, die Ehrenamt leichter machen.':
    'Digital solutions that make volunteering easier.',
  'Cookie-Einstellungen': 'Cookie settings',
  'Eure Nachricht *': 'Your message *',
  'Eure Angaben werden ausschließlich zum Versand dieser Nachricht verwendet.':
    'Your details are used solely to send this message.',
  'Vielen Dank für eure Nachricht. Ich melde mich zeitnah bei euch.':
    'Thank you for your message. I will get back to you shortly.',
  'Bitte prüft die markierten Felder.': 'Please check the highlighted fields.',
};

@Directive({ selector: '[appTranslatePage]', standalone: true })
export class TranslatePageDirective implements AfterViewInit, OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly language = inject(LanguageService);
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly originals = new WeakMap<Node, string>();
  private observer?: MutationObserver;

  constructor() {
    effect(() => {
      this.language.language();
      if (this.browser) queueMicrotask(() => this.translateTree(this.host.nativeElement));
    });
  }

  ngAfterViewInit(): void {
    if (!this.browser) return;
    this.translateTree(this.host.nativeElement);
    this.observer = new MutationObserver(records =>
      records.forEach(record => record.addedNodes.forEach(node => this.translateTree(node))),
    );
    this.observer.observe(this.host.nativeElement, { childList: true, subtree: true });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private translateTree(root: Node): void {
    if (root.nodeType === Node.TEXT_NODE) this.translateText(root);
    root.childNodes.forEach(node => this.translateTree(node));
    if (root instanceof HTMLElement)
      ['aria-label', 'title', 'alt', 'placeholder'].forEach(attr =>
        this.translateAttribute(root, attr),
      );
  }

  private translateText(node: Node): void {
    const current = node.textContent ?? '';
    if (!this.originals.has(node)) this.originals.set(node, current);
    const original = this.originals.get(node) ?? current;
    const trimmed = original.trim();
    const translated = this.language.language() === 'en' ? EN[trimmed] : undefined;
    node.textContent = original.replace(trimmed, translated ?? trimmed);
  }

  private translateAttribute(element: HTMLElement, attribute: string): void {
    const value = element.getAttribute(attribute);
    if (!value) return;
    const key = `${attribute}:${value}`;
    if (!element.dataset['translationOriginals']) element.dataset['translationOriginals'] = '{}';
    const originals = JSON.parse(element.dataset['translationOriginals']) as Record<string, string>;
    if (!originals[key]) originals[key] = value;
    element.dataset['translationOriginals'] = JSON.stringify(originals);
    const original = originals[key];
    element.setAttribute(
      attribute,
      this.language.language() === 'en' ? (EN[original] ?? original) : original,
    );
  }
}
