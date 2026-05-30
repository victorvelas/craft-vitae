<script setup lang="ts">
import type { Language } from '../types/cv';

defineProps<{
  languages: Language[];
  addLanguage: () => void;
  removeLanguage: (id: string) => void;
  setNativeLanguage: (id: string) => void;
}>();
</script>

<template>
  <div class="space-y-4">
    <div v-for="(lang, index) in languages" :key="lang.id" class="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 relative">
      <button 
        type="button"
        @click="removeLanguage(lang.id)" 
        class="absolute top-3 right-3 sm:static text-slate-400 hover:text-rose-500 transition cursor-pointer"
        title="Remove Language"
      >
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>

      <span class="text-xs font-bold text-slate-400 shrink-0">#{{ index + 1 }}</span>

      <div class="flex-1 w-full sm:w-auto">
        <input 
          type="text" 
          v-model="lang.name" 
          placeholder="e.g. Spanish" 
          class="w-full px-3 py-1.5 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition"
        />
      </div>

      <div class="flex items-center gap-2 w-full sm:w-auto shrink-0 mt-2 sm:mt-0">
        <div v-if="lang.level === 'native'" class="px-3 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/50 rounded-lg select-none">
          Native Language
        </div>
        <select 
          v-else
          v-model="lang.level" 
          class="px-2 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition cursor-pointer"
        >
          <option value="A1">A1 (Beginner)</option>
          <option value="A2">A2 (Elementary)</option>
          <option value="B1">B1 (Intermediate)</option>
          <option value="B2">B2 (Upper Intermediate)</option>
          <option value="C1">C1 (Advanced)</option>
          <option value="C2">C2 (Proficient)</option>
        </select>

        <button 
          v-if="lang.level !== 'native'"
          type="button"
          @click="setNativeLanguage(lang.id)"
          class="px-2 py-1 text-[10px] uppercase font-bold tracking-wider rounded-md border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer text-slate-600 dark:text-slate-400"
        >
          Make Native
        </button>
      </div>
    </div>

    <button 
      type="button"
      @click="addLanguage" 
      class="w-full py-2 flex items-center justify-center gap-2 border border-dashed border-indigo-300 hover:border-indigo-500 dark:border-slate-800 dark:hover:border-indigo-400 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20 text-xs font-semibold rounded-lg transition cursor-pointer"
    >
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
      Add Language
    </button>
  </div>
</template>
