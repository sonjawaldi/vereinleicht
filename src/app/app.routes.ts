import { Routes } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { ImprintComponent } from './components/imprint/imprint.component';
import { AccessibilityComponent } from './components/accessibility/accessibility.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'impressum', component: ImprintComponent },
  { path: 'barrierefreiheit', component: AccessibilityComponent },
  { path: 'datenschutz', component: PrivacyComponent },
  { path: '**', component: ErrorComponent },
];
