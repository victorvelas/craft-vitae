<script setup lang="ts">
import type { CVData } from '../types/cv';

defineProps<{
  cvData: CVData;
}>();

// Helper to format date string YYYY-MM to MMM YYYY (e.g. "2023-03" -> "Mar 2023")
const formatDate = (dateStr: string | undefined): string => {
  if (!dateStr) return '';
  try {
    const parts = dateStr.split('-');
    if (parts.length < 2) return dateStr;
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // 0-indexed
    const date = new Date(year, month);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  } catch (e) {
    return dateStr;
  }
};

const handlePrint = () => {
  window.print();
};
</script>

<template>
  <div class="flex flex-col h-full bg-slate-100 dark:bg-slate-950 overflow-y-auto p-4 md:p-8 items-center scrollbar-thin print:p-0 print:bg-white print:overflow-visible">
    <!-- Top toolbar, hidden on print -->
    <div class="w-full max-w-[21cm] mb-4 flex justify-between items-center print:hidden">
      <span class="text-xs text-slate-500 dark:text-slate-400 font-medium">
        Live CV Preview (Auto-scales to A4)
      </span>
      <button 
        @click="handlePrint"
        class="px-4 py-2 bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 font-semibold text-xs rounded-lg hover:bg-slate-700 dark:hover:bg-slate-100 transition shadow cursor-pointer flex items-center gap-1.5"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
        </svg>
        Print or Save PDF
      </button>
    </div>

    <!-- The Paper (A4 size: 21cm x 29.7cm) -->
    <div 
      class="w-full max-w-[21cm] min-h-[29.7cm] bg-white text-slate-900 shadow-xl rounded-lg p-[1.2cm] flex flex-col font-sans box-border transition-all duration-300 print:shadow-none print:rounded-none print:p-0 print:w-full print:min-h-0"
      id="cv-printable-area"
    >
      <!-- Header Section -->
      <header class="border-b-2 border-indigo-600 pb-5 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 class="text-3xl font-extrabold tracking-tight text-slate-900 m-0 uppercase leading-none">
            {{ cvData.personalInfo.firstName || 'First Name' }}
            <span class="text-indigo-600 font-light block sm:inline">{{ cvData.personalInfo.lastName || 'Last Name' }}</span>
          </h2>
          <!-- Subtitle / Main Role -->
          <p class="text-sm font-semibold tracking-wider text-slate-500 uppercase mt-2">
            {{ cvData.experiences[0]?.position || 'Professional Resume' }}
          </p>
        </div>

        <!-- Contact details right aligned on desktop -->
        <div class="text-xs text-slate-600 space-y-1.5 font-medium sm:text-right">
          <div v-if="cvData.personalInfo.email" class="flex items-center sm:justify-end gap-1.5">
            <span>{{ cvData.personalInfo.email }}</span>
            <svg class="w-3.5 h-3.5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div v-if="cvData.personalInfo.phone" class="flex items-center sm:justify-end gap-1.5">
            <span>{{ cvData.personalInfo.phone }}</span>
            <svg class="w-3.5 h-3.5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <div v-if="cvData.personalInfo.website" class="flex items-center sm:justify-end gap-1.5">
            <a :href="cvData.personalInfo.website" target="_blank" class="hover:underline text-indigo-600 print:text-slate-700">
              {{ cvData.personalInfo.website.replace(/^https?:\/\//, '') }}
            </a>
            <svg class="w-3.5 h-3.5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          </div>
          <div v-if="cvData.personalInfo.address" class="flex items-center sm:justify-end gap-1.5">
            <span>{{ cvData.personalInfo.address }}</span>
            <svg class="w-3.5 h-3.5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        </div>
      </header>

      <!-- Two Column Layout on Paper -->
      <div class="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 print:grid-cols-3">
        
        <!-- Left Column: Personal info summary, photo, skills, languages -->
        <div class="md:col-span-1 border-r border-slate-100 pr-4 print:col-span-1 print:border-r print:border-slate-100">
          
          <!-- Photo Container -->
          <div v-if="cvData.personalInfo.photo" class="mb-5 flex justify-center md:justify-start">
            <div class="w-32 h-32 rounded-xl overflow-hidden border-2 border-indigo-100 shadow-sm">
              <img :src="cvData.personalInfo.photo" class="w-full h-full object-cover" alt="CV Profile Photo" />
            </div>
          </div>

          <!-- About Me Section -->
          <div v-if="cvData.personalInfo.aboutMe" class="mb-6">
            <h3 class="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2.5">About Me</h3>
            <p class="text-[11.5px] leading-relaxed text-slate-700 font-normal text-justify whitespace-pre-line">
              {{ cvData.personalInfo.aboutMe }}
            </p>
          </div>

          <!-- Skills Section -->
          <div class="mb-6" v-if="cvData.skills.hard.length > 0 || cvData.skills.soft.length > 0">
            <h3 class="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2.5">Skills</h3>
            
            <!-- Technical / Hard Skills -->
            <div v-if="cvData.skills.hard.length > 0" class="mb-4">
              <h4 class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Technical</h4>
              <div class="flex flex-wrap gap-1">
                <span 
                  v-for="(skill, i) in cvData.skills.hard" 
                  :key="'pr-hard-'+i"
                  class="text-[10px] font-medium px-2 py-0.5 bg-slate-100 text-slate-800 rounded"
                >
                  {{ skill }}
                </span>
              </div>
            </div>

            <!-- Interpersonal / Soft Skills -->
            <div v-if="cvData.skills.soft.length > 0">
              <h4 class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Soft Skills</h4>
              <ul class="list-disc pl-4 text-[11px] text-slate-750 space-y-0.5 leading-tight">
                <li v-for="(skill, i) in cvData.skills.soft" :key="'pr-soft-'+i">
                  {{ skill }}
                </li>
              </ul>
            </div>
          </div>

          <!-- Languages Section -->
          <div v-if="cvData.languages.length > 0" class="mb-6">
            <h3 class="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2.5">Languages</h3>
            <div class="space-y-1.5">
              <div 
                v-for="lang in cvData.languages" 
                :key="'pr-lang-'+lang.id"
                class="flex justify-between items-center text-[11px]"
              >
                <span class="font-semibold text-slate-800">{{ lang.name || 'Language' }}</span>
                <span 
                  class="text-[9px] px-1.5 py-0.5 font-bold uppercase tracking-wide rounded"
                  :class="lang.level === 'native' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'"
                >
                  {{ lang.level }}
                </span>
              </div>
            </div>
          </div>

        </div>

        <!-- Right Column: Professional Profile, Experience, Education -->
        <div class="md:col-span-2 space-y-6 print:col-span-2">
          
          <!-- Professional Profile Text -->
          <div v-if="cvData.personalInfo.profile" class="pb-4 border-b border-slate-100">
            <h3 class="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2.5">Professional Profile</h3>
            <p class="text-[12px] leading-relaxed text-slate-700 text-justify font-normal whitespace-pre-line">
              {{ cvData.personalInfo.profile }}
            </p>
          </div>

          <!-- Professional Experience Section -->
          <div v-if="cvData.experiences.length > 0">
            <h3 class="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-3.5 flex items-center">
              Professional Experience
            </h3>
            
            <div class="space-y-4">
              <div 
                v-for="exp in cvData.experiences" 
                :key="'pr-exp-'+exp.id"
                class="relative border-l border-slate-200 pl-4 pb-2"
              >
                <!-- Timeline bullet -->
                <div class="absolute w-2 h-2 bg-indigo-600 rounded-full -left-[4.5px] top-[5px]"></div>
                
                <div class="flex justify-between items-start flex-wrap gap-1 mb-0.5">
                  <h4 class="text-[12px] font-bold text-slate-900 leading-tight">
                    {{ exp.position || 'Position' }} 
                    <span class="text-slate-400 font-normal">at</span> 
                    <span class="text-indigo-600 font-semibold">{{ exp.company || 'Company' }}</span>
                  </h4>
                  <span class="text-[10px] font-bold text-slate-500 whitespace-nowrap">
                    {{ formatDate(exp.startDate) }} - {{ exp.current ? 'Actuality' : formatDate(exp.endDate) }}
                  </span>
                </div>
                
                <div class="text-[10px] font-semibold text-slate-400 mb-1.5">
                  {{ exp.address }}
                </div>
              </div>
            </div>
          </div>

          <!-- Education Section -->
          <div v-if="cvData.educationList.length > 0 || cvData.courses.length > 0" class="space-y-5">
            
            <!-- Formal Education -->
            <div v-if="cvData.educationList.length > 0">
              <h3 class="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-3.5">Education</h3>
              <div class="space-y-3.5">
                <div 
                  v-for="edu in cvData.educationList" 
                  :key="'pr-edu-'+edu.id"
                  class="flex justify-between items-start gap-3"
                >
                  <div>
                    <h4 class="text-[11.5px] font-bold text-slate-900 leading-tight">
                      {{ edu.career || 'Degree / Major' }}
                    </h4>
                    <p class="text-[10.5px] text-slate-600 font-medium mt-0.5">
                      {{ edu.school || 'School / University' }}
                    </p>
                    <p class="text-[9.5px] text-slate-400 font-semibold">
                      {{ edu.place }}
                    </p>
                  </div>
                  <span class="text-[10px] font-bold text-slate-500 whitespace-nowrap">
                    {{ formatDate(edu.startDate) }} - {{ formatDate(edu.endDate) }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Courses & Certifications -->
            <div v-if="cvData.courses.length > 0" class="pt-2">
              <h3 class="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-3">Courses & Certifications</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 print:grid-cols-2">
                <div 
                  v-for="course in cvData.courses" 
                  :key="'pr-crs-'+course.id"
                  class="p-2 rounded-lg bg-slate-50 border border-slate-100 flex flex-col justify-between"
                >
                  <div>
                    <h4 class="text-[10.5px] font-bold text-slate-800 leading-tight">
                      {{ course.title || 'Course Title' }}
                    </h4>
                    <p class="text-[9.5px] text-slate-500 font-semibold mt-0.5">
                      {{ course.provider || 'Provider' }}
                    </p>
                  </div>
                  <div class="flex justify-between items-center mt-2 pt-1 border-t border-slate-100 text-[9px] font-bold text-slate-400">
                    <span>Ended: {{ formatDate(course.dateEnd) }}</span>
                    <span class="capitalize px-1 bg-slate-200/50 rounded text-slate-600">{{ course.modality }}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
/* Page proportions and print setups */
@media screen {
  #cv-printable-area {
    aspect-ratio: 210 / 297;
  }
}

/* Scrollbar styling */
.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background: rgba(100, 116, 139, 0.2);
  border-radius: 3px;
}
.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: rgba(100, 116, 139, 0.4);
}
</style>
