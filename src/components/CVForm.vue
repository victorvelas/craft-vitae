<script setup lang="ts">
import { ref } from 'vue';
import type { CVData } from '../types/cv';
import CVPersonalForm from './CVPersonalForm.vue';
import CVExperienceForm from './CVExperienceForm.vue';
import CVEducationForm from './CVEducationForm.vue';
import CVSkillsForm from './CVSkillsForm.vue';
import CVLanguagesForm from './CVLanguagesForm.vue';

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

const appName = import.meta.env.VITE_APP_NAME;

// Active accordion section
const activeSection = ref<string>('personal');

const toggleSection = (section: string) => {
  activeSection.value = activeSection.value === section ? '' : section;
};

// JSON Import File Input Reference
const jsonFileInput = ref<HTMLInputElement | null>(null);

const triggerJsonImport = () => {
  jsonFileInput.value?.click();
};

const handleJsonFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    try {
      await props.importJSONFile(target.files[0]);
      alert('CV data imported successfully!');
    } catch (err: any) {
      alert(`Error importing JSON: ${err.message || err}`);
    }
    // Clear input
    target.value = '';
  }
};
</script>

<template>
  <div class="flex flex-col h-full bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 overflow-hidden">
    <!-- Form Actions Bar -->
    <div class="p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex flex-wrap gap-2 justify-between items-center z-10 shadow-sm">
      <h1 class="text-xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400 m-0">{{ appName }}</h1>
      <small class="text-muted">Write your CV all for free</small>
      <div class="flex gap-2">
        <button 
          @click="triggerJsonImport" 
          class="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition duration-150 ease-in-out cursor-pointer"
        >
          Import JSON
        </button>
        <input 
          type="file" 
          ref="jsonFileInput" 
          accept=".json" 
          @change="handleJsonFileChange" 
          class="hidden" 
        />
        <button 
          @click="exportJSON" 
          class="px-3 py-1.5 text-xs font-medium rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition duration-150 ease-in-out cursor-pointer"
        >
          Export JSON
        </button>
        <button 
          @click="resetToDummy" 
          title="Reset to sample data"
          class="px-2 py-1.5 text-xs rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-medium transition duration-150 ease-in-out cursor-pointer"
        >
          Template Data
        </button>
        <button 
          @click="clearAll" 
          title="Clear all inputs"
          class="px-2 py-1.5 text-xs rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 font-medium transition duration-150 ease-in-out cursor-pointer"
        >
          Clear All
        </button>
      </div>
    </div>

    <!-- Accordion Sections Container -->
    <div class="flex-1 overflow-y-auto p-4 space-y-4 max-h-[calc(100vh-73px)]">
      
      <!-- SECTION 1: Personal Details & Photo -->
      <div class="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden transition-all duration-200 shadow-sm">
        <button 
          @click="toggleSection('personal')"
          class="w-full px-5 py-4 flex justify-between items-center font-semibold text-left text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
        >
          <span class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
            Personal Details & Photo
          </span>
          <svg 
            class="w-5 h-5 transition-transform duration-200" 
            :class="{ 'rotate-180': activeSection === 'personal' }" 
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        <div v-show="activeSection === 'personal'" class="p-5 border-t border-slate-100 dark:border-slate-900">
          <CVPersonalForm 
            :personal-info="cvData.personalInfo"
            :upload-photo="uploadPhoto"
            :remove-photo="removePhoto"
          />
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
            Professional Experience ({{ cvData.experiences.length }})
          </span>
          <svg 
            class="w-5 h-5 transition-transform duration-200" 
            :class="{ 'rotate-180': activeSection === 'experience' }" 
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
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
            Education & Courses
          </span>
          <svg 
            class="w-5 h-5 transition-transform duration-200" 
            :class="{ 'rotate-180': activeSection === 'education' }" 
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
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

      <!-- SECTION 4: Skills (Soft & Hard) -->
      <div class="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden transition-all duration-200 shadow-sm">
        <button 
          @click="toggleSection('skills')"
          class="w-full px-5 py-4 flex justify-between items-center font-semibold text-left text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
        >
          <span class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
            Soft & Hard Skills
          </span>
          <svg 
            class="w-5 h-5 transition-transform duration-200" 
            :class="{ 'rotate-180': activeSection === 'skills' }" 
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div v-show="activeSection === 'skills'" class="p-5 border-t border-slate-100 dark:border-slate-900">
          <CVSkillsForm 
            :skills="cvData.skills"
            :add-skill="addSkill"
            :remove-skill="removeSkill"
          />
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
            Languages ({{ cvData.languages.length }})
          </span>
          <svg 
            class="w-5 h-5 transition-transform duration-200" 
            :class="{ 'rotate-180': activeSection === 'languages' }" 
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
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
