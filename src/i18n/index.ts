import { createI18n } from 'vue-i18n';
import en from './en';
import es from './es';

export const i18n = createI18n({
  legacy: false,        // Use Composition API mode
  locale: 'en',        // Default locale
  fallbackLocale: 'en',
  messages: { en, es },
});

export type SupportedLocale = 'en' | 'es';

export const LOCALES: { code: SupportedLocale; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
];
