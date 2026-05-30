<script setup lang="ts">
import { ref } from 'vue';
import { useCV } from './composables/useCV';
import CVForm from './components/CVForm.vue';
import CVPreview from './components/CVPreview.vue';

const {
  cvData,
  uploadPhoto,
  removePhoto,
  addExperience,
  removeExperience,
  setCurrentExperience,
  addFormalEducation,
  removeFormalEducation,
  addCourse,
  removeCourse,
  addSkill,
  removeSkill,
  addLanguage,
  removeLanguage,
  setNativeLanguage,
  resetToDummy,
  clearAll,
  exportJSON,
  importJSONFile
} = useCV();

// Mobile view tab toggle: 'edit' or 'preview'
const activeTab = ref<'edit' | 'preview'>('edit');
</script>

<template>
  <div class="h-screen w-screen flex flex-col overflow-hidden bg-slate-100 dark:bg-slate-900 print:h-auto print:w-auto print:overflow-visible">
    <!-- Main Workspace Container -->
    <main class="flex-1 flex overflow-hidden print:overflow-visible">
      <!-- Left Column / Form Editor -->
      <section 
        class="w-full lg:w-[460px] xl:w-[700px] shrink-0 h-full overflow-hidden print:hidden"
        :class="{ 'hidden lg:block': activeTab !== 'edit' }"
      >
        <CVForm 
          :cv-data="cvData"
          :upload-photo="uploadPhoto"
          :remove-photo="removePhoto"
          :add-experience="addExperience"
          :remove-experience="removeExperience"
          :set-current-experience="setCurrentExperience"
          :add-formal-education="addFormalEducation"
          :remove-formal-education="removeFormalEducation"
          :add-course="addCourse"
          :remove-course="removeCourse"
          :add-skill="addSkill"
          :remove-skill="removeSkill"
          :add-language="addLanguage"
          :remove-language="removeLanguage"
          :set-native-language="setNativeLanguage"
          :reset-to-dummy="resetToDummy"
          :clear-all="clearAll"
          :export-j-s-o-n="exportJSON"
          :import-j-s-o-n-file="importJSONFile"
        />
      </section>

      <!-- Right Column / A4 Live Preview -->
      <section 
        class="flex-1 h-full overflow-hidden print:block print:h-auto print:overflow-visible"
        :class="{ 'hidden lg:block': activeTab !== 'preview' }"
      >
        <CVPreview :cv-data="cvData" />
      </section>
    </main>

    <!-- Mobile Navigation Tab Bar (Hidden on desktop & print) -->
    <div class="lg:hidden shrink-0 h-14 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-around print:hidden z-20">
      <button 
        @click="activeTab = 'edit'"
        class="flex-1 py-3 text-center flex flex-col items-center justify-center gap-1 cursor-pointer transition"
        :class="activeTab === 'edit' ? 'text-indigo-600 dark:text-indigo-400 font-bold' : 'text-slate-400 dark:text-slate-500 font-medium'"
      >
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        <span class="text-[10px]">Editor</span>
      </button>

      <button 
        @click="activeTab = 'preview'"
        class="flex-1 py-3 text-center flex flex-col items-center justify-center gap-1 cursor-pointer transition"
        :class="activeTab === 'preview' ? 'text-indigo-600 dark:text-indigo-400 font-bold' : 'text-slate-400 dark:text-slate-500 font-medium'"
      >
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        <span class="text-[10px]">Preview</span>
      </button>
    </div>
  </div>
</template>
