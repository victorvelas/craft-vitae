<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import type { CVData } from '../types/cv';
import { LOCALES, type SupportedLocale } from '../i18n';
import CVPersonalForm from './CVPersonalForm.vue';
import CVExperienceForm from './CVExperienceForm.vue';
import CVEducationForm from './CVEducationForm.vue';
import CVSkillsForm from './CVSkillsForm.vue';
import CVLanguagesForm from './CVLanguagesForm.vue';

const { t, locale } = useI18n();

const props = defineProps<{
  cvData: CVData;
  uploadPhoto: (file: File) => Promise<void>;
  removePhoto: () => void;
  addExperience: () => void;
  removeExperience: (id: string) => void;
  setCurrentExperience: (id: string) => void;
  addFormalEducation: () => void;
  removeFormalEducation: (id: string) => void;
  addCourse: () => void;
  removeCourse: (id: string) => void;
  addSkill: (type: 'soft' | 'hard', name: string) => void;
  removeSkill: (type: 'soft' | 'hard', index: number) => void;
  addLanguage: () => void;
  removeLanguage: (id: string) => void;
  setNativeLanguage: (id: string) => void;
  resetToDummy: () => void;
  clearAll: () => void;
  exportJSON: () => void;
  importJSONFile: (file: File) => Promise<void>;
}>();

// Active accordion section
const activeSection = ref<string>('personal');
const toggleSection = (section: string) => {
  activeSection.value = activeSection.value === section ? '' : section;
};

// Collapsible actions dropdown
const actionsOpen = ref(false);
const toggleActions = () => { actionsOpen.value = !actionsOpen.value; };
const closeActions = () => { actionsOpen.value = false; };

// Language selector
const setLocale = (code: SupportedLocale) => {
  locale.value = code;
  closeActions();
};

// JSON Import
const jsonFileInput = ref<HTMLInputElement | null>(null);
const triggerJsonImport = () => {
  closeActions();
  jsonFileInput.value?.click();
};
const handleJsonFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    try {
      await props.importJSONFile(target.files[0]);
      alert(t('actions.importSuccess'));
    } catch (err: any) {
      alert(t('actions.importError', { msg: err.message || err }));
    }
    target.value = '';
  }
};
</script>

<template>
  <div
    class="flex flex-col h-full bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 overflow-hidden"
    @click.self="closeActions"
  >
    <!-- Form Actions Bar -->
    <div class="grid grid-cols-2 px-4 py-3  border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 z-10 shadow-sm">
      <!-- Top row: title + tagline -->
      <div class="flex items-baseline gap-3 mb-2">
        <h1 class="text-lg font-bold tracking-tight text-indigo-600 dark:text-indigo-400 m-0 leading-none">
          {{ t('app.name') }}
        </h1>
        <small class="text-[11px] text-slate-400 dark:text-slate-500 font-normal leading-none">
          {{ t('app.tagline') }}
        </small>
      </div>

      <!-- Bottom row: lang selector + collapsible actions -->
      <div class="flex items-center gap-2 justify-end">

        <!-- Language Selector -->
        <div class="flex items-center gap-1 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden shrink-0">
          <button
            v-for="loc in LOCALES"
            :key="loc.code"
            type="button"
            @click="setLocale(loc.code as SupportedLocale)"
            :title="loc.label"
            class="px-2.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer"
            :class="locale === loc.code
              ? 'bg-indigo-600 text-white'
              : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'"
          >
            {{ loc.flag }} {{ loc.code.toUpperCase() }}
          </button>
        </div>

        <!-- Collapsible Actions Dropdown -->
        <div class="relative" v-click-outside="closeActions">
          <button
            type="button"
            @click="toggleActions"
            class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            :class="actionsOpen ? 'bg-slate-100 dark:bg-slate-800' : ''"
          >
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
            {{ t('actions.label') }}
            <svg
              class="w-3 h-3 transition-transform duration-200"
              :class="actionsOpen ? 'rotate-180' : ''"
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <!-- Dropdown Panel -->
          <Transition
            enter-active-class="transition ease-out duration-150"
            enter-from-class="opacity-0 scale-95 -translate-y-1"
            enter-to-class="opacity-100 scale-100 translate-y-0"
            leave-active-class="transition ease-in duration-100"
            leave-from-class="opacity-100 scale-100 translate-y-0"
            leave-to-class="opacity-0 scale-95 -translate-y-1"
          >
            <div
              v-if="actionsOpen"
              class="absolute right-0 top-full mt-1.5 w-44 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg overflow-hidden z-50"
            >
              <button
                type="button"
                @click="triggerJsonImport"
                class="w-full text-left px-4 py-2.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 transition cursor-pointer flex items-center gap-2"
              >
                <svg class="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                {{ t('actions.importJSON') }}
              </button>
              <button
                type="button"
                @click="() => { exportJSON(); closeActions(); }"
                class="w-full text-left px-4 py-2.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 transition cursor-pointer flex items-center gap-2"
              >
                <svg class="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                {{ t('actions.exportJSON') }}
              </button>
              <div class="border-t border-slate-100 dark:border-slate-800"></div>
              <button
                type="button"
                @click="() => { resetToDummy(); closeActions(); }"
                class="w-full text-left px-4 py-2.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 transition cursor-pointer flex items-center gap-2"
              >
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {{ t('actions.templateData') }}
              </button>
              <button
                type="button"
                @click="() => { clearAll(); closeActions(); }"
                class="w-full text-left px-4 py-2.5 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50/50 dark:hover:bg-rose-950/20 transition cursor-pointer flex items-center gap-2"
              >
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                {{ t('actions.clearAll') }}
              </button>
            </div>
          </Transition>
        </div>

        <!-- Hidden file input for JSON import -->
        <input
          type="file"
          ref="jsonFileInput"
          accept=".json"
          @change="handleJsonFileChange"
          class="hidden"
        />
      </div>
    </div>

    <!-- Accordion Sections Container -->
    <div class="flex-1 overflow-y-auto p-4 space-y-4 max-h-[calc(100vh-90px)]" @click="closeActions">

      <!-- SECTION 1: Personal Details & Photo -->
      <div class="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden transition-all duration-200 shadow-sm">
        <button
          @click="toggleSection('personal')"
          class="w-full px-5 py-4 flex justify-between items-center font-semibold text-left text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
        >
          <span class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
            {{ t('sections.personal') }}
          </span>
          <svg class="w-5 h-5 transition-transform duration-200" :class="{ 'rotate-180': activeSection === 'personal' }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div v-show="activeSection === 'personal'" class="p-5 border-t border-slate-100 dark:border-slate-900">
          <CVPersonalForm :personal-info="cvData.personalInfo" :upload-photo="uploadPhoto" :remove-photo="removePhoto" />
        </div>
      </div>

      <!-- SECTION 2: Professional Experience -->
      <div class="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden transition-all duration-200 shadow-sm">
        <button
          @click="toggleSection('experience')"
          class="w-full px-5 py-4 flex justify-between items-center font-semibold text-left text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
        >
          <span class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
            {{ t('sections.experience') }} ({{ cvData.experiences.length }})
          </span>
          <svg class="w-5 h-5 transition-transform duration-200" :class="{ 'rotate-180': activeSection === 'experience' }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div v-show="activeSection === 'experience'" class="p-5 border-t border-slate-100 dark:border-slate-900">
          <CVExperienceForm
            :experiences="cvData.experiences"
            :add-experience="addExperience"
            :remove-experience="removeExperience"
            :set-current-experience="setCurrentExperience"
          />
        </div>
      </div>

      <!-- SECTION 3: Education & Courses -->
      <div class="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden transition-all duration-200 shadow-sm">
        <button
          @click="toggleSection('education')"
          class="w-full px-5 py-4 flex justify-between items-center font-semibold text-left text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
        >
          <span class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
            {{ t('sections.education') }}
          </span>
          <svg class="w-5 h-5 transition-transform duration-200" :class="{ 'rotate-180': activeSection === 'education' }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div v-show="activeSection === 'education'" class="p-5 border-t border-slate-100 dark:border-slate-900">
          <CVEducationForm
            :education-list="cvData.educationList"
            :courses="cvData.courses"
            :add-formal-education="addFormalEducation"
            :remove-formal-education="removeFormalEducation"
            :add-course="addCourse"
            :remove-course="removeCourse"
          />
        </div>
      </div>

      <!-- SECTION 4: Skills -->
      <div class="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden transition-all duration-200 shadow-sm">
        <button
          @click="toggleSection('skills')"
          class="w-full px-5 py-4 flex justify-between items-center font-semibold text-left text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
        >
          <span class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
            {{ t('sections.skills') }}
          </span>
          <svg class="w-5 h-5 transition-transform duration-200" :class="{ 'rotate-180': activeSection === 'skills' }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div v-show="activeSection === 'skills'" class="p-5 border-t border-slate-100 dark:border-slate-900">
          <CVSkillsForm :skills="cvData.skills" :add-skill="addSkill" :remove-skill="removeSkill" />
        </div>
      </div>

      <!-- SECTION 5: Languages -->
      <div class="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden transition-all duration-200 shadow-sm">
        <button
          @click="toggleSection('languages')"
          class="w-full px-5 py-4 flex justify-between items-center font-semibold text-left text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
        >
          <span class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
            {{ t('sections.languages') }} ({{ cvData.languages.length }})
          </span>
          <svg class="w-5 h-5 transition-transform duration-200" :class="{ 'rotate-180': activeSection === 'languages' }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div v-show="activeSection === 'languages'" class="p-5 border-t border-slate-100 dark:border-slate-900">
          <CVLanguagesForm
            :languages="cvData.languages"
            :add-language="addLanguage"
            :remove-language="removeLanguage"
            :set-native-language="setNativeLanguage"
          />
        </div>
      </div>

    </div>
  </div>
</template>
