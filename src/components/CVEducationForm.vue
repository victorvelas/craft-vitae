<script setup lang="ts">
import type { FormalEducation, Course } from '../types/cv';

defineProps<{
  educationList: FormalEducation[];
  courses: Course[];
  addFormalEducation: () => void;
  removeFormalEducation: (id: string) => void;
  addCourse: () => void;
  removeCourse: (id: string) => void;
}>();
</script>

<template>
  <div class="space-y-6">
    <!-- Sub-Section: Formal Education -->
    <div>
      <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between border-b pb-2 border-slate-100 dark:border-slate-800">
        Formal Education
        <span class="text-[10px] text-slate-400 font-normal">Degrees, Universities, Schools</span>
      </h3>
      
      <div class="space-y-4">
        <div v-for="(edu, index) in educationList" :key="edu.id" class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 relative space-y-4">
          <button 
            type="button"
            @click="removeFormalEducation(edu.id)" 
            class="absolute top-4 right-4 text-slate-400 hover:text-rose-500 transition cursor-pointer"
            title="Remove Formal Education"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>

          <span class="inline-block text-xs font-bold px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded">
            Education #{{ index + 1 }}
          </span>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-650 dark:text-slate-400 mb-1">University / School</label>
              <input 
                type="text" 
                v-model="edu.school" 
                placeholder="e.g. Stanford University" 
                class="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition"
              />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-650 dark:text-slate-400 mb-1">Career / Degree</label>
              <input 
                type="text" 
                v-model="edu.career" 
                placeholder="e.g. B.S. in Computer Science" 
                class="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-650 dark:text-slate-400 mb-1">Location / Place</label>
              <input 
                type="text" 
                v-model="edu.place" 
                placeholder="e.g. Stanford, CA" 
                class="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition"
              />
            </div>
            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="block text-xs font-semibold text-slate-650 dark:text-slate-400 mb-1">Start Date</label>
                <input 
                  type="month" 
                  v-model="edu.startDate" 
                  class="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition"
                />
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-655 dark:text-slate-400 mb-1">End Date</label>
                <input 
                  type="month" 
                  v-model="edu.endDate" 
                  class="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition"
                />
              </div>
            </div>
          </div>
        </div>

        <button 
          type="button"
          @click="addFormalEducation" 
          class="w-full py-2 flex items-center justify-center gap-2 border border-dashed border-indigo-300 hover:border-indigo-500 dark:border-slate-800 dark:hover:border-indigo-400 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20 text-xs font-semibold rounded-lg transition cursor-pointer"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Add Formal Education
        </button>
      </div>
    </div>

    <!-- Sub-Section: Courses & Certificates -->
    <div class="pt-4 border-t border-slate-200 dark:border-slate-800">
      <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between border-b pb-2 border-slate-100 dark:border-slate-800">
        Courses & Certifications
        <span class="text-[10px] text-slate-400 font-normal">Bootcamps, online certifications</span>
      </h3>

      <div class="space-y-4">
        <div v-for="(course, index) in courses" :key="course.id" class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 relative space-y-4">
          <button 
            type="button"
            @click="removeCourse(course.id)" 
            class="absolute top-4 right-4 text-slate-400 hover:text-rose-500 transition cursor-pointer"
            title="Remove Course"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>

          <span class="inline-block text-xs font-bold px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 rounded">
            Course #{{ index + 1 }}
          </span>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-650 dark:text-slate-400 mb-1">Course Name</label>
              <input 
                type="text" 
                v-model="course.title" 
                placeholder="e.g. Advanced TypeScript" 
                class="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition"
              />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-650 dark:text-slate-400 mb-1">School / Institute</label>
              <input 
                type="text" 
                v-model="course.provider" 
                placeholder="e.g. Coursera / Udemy" 
                class="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition"
              />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-650 dark:text-slate-400 mb-1">Date of End</label>
              <input 
                type="month" 
                v-model="course.dateEnd" 
                class="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition"
              />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-650 dark:text-slate-400 mb-1">Modality</label>
              <select 
                v-model="course.modality" 
                class="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition cursor-pointer"
              >
                <option value="virtual">Virtual / Online</option>
                <option value="presential">Presential / In-Person</option>
              </select>
            </div>
          </div>
        </div>

        <button 
          type="button"
          @click="addCourse" 
          class="w-full py-2 flex items-center justify-center gap-2 border border-dashed border-emerald-300 hover:border-emerald-500 dark:border-slate-800 dark:hover:border-emerald-400 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 text-xs font-semibold rounded-lg transition cursor-pointer"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Add Course/Certificate
        </button>
      </div>
    </div>
  </div>
</template>
