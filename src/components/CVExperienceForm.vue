<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import type { Experience } from '../types/cv';

const { t } = useI18n();

defineProps<{
  experiences: Experience[];
  addExperience: () => void;
  removeExperience: (id: string) => void;
  setCurrentExperience: (id: string) => void;
}>();
</script>

<template>
  <div class="space-y-6">

    <p v-if="experiences.length === 0" class="text-xs text-slate-400 italic text-center py-2">
      {{ t('experience.noItems') }}
    </p>

    <div v-for="(exp, index) in experiences" :key="exp.id" class="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 relative space-y-4">
      <button
        type="button"
        @click="removeExperience(exp.id)"
        class="absolute top-4 right-4 text-slate-400 hover:text-rose-500 transition cursor-pointer"
        :title="t('experience.removeTitle')"
      >
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>

      <span class="inline-block text-xs font-bold px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded">
        {{ t('experience.positionBadge', { n: index + 1 }) }}
      </span>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">{{ t('experience.company') }}</label>
          <input
            type="text"
            v-model="exp.company"
            :placeholder="t('experience.companyPlaceholder')"
            class="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition"
          />
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">{{ t('experience.position') }}</label>
          <input
            type="text"
            v-model="exp.position"
            :placeholder="t('experience.positionPlaceholder')"
            class="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition"
          />
        </div>
      </div>

      <div>
        <label class="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">{{ t('experience.location') }}</label>
        <input
          type="text"
          v-model="exp.address"
          :placeholder="t('experience.locationPlaceholder')"
          class="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition"
        />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">{{ t('experience.startDate') }}</label>
          <input
            type="month"
            v-model="exp.startDate"
            class="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition"
          />
        </div>
        <div v-show="!exp.current">
          <label class="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">{{ t('experience.endDate') }}</label>
          <input
            type="month"
            v-model="exp.endDate"
            class="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition"
          />
        </div>
        <div v-if="exp.current" class="flex items-end pb-1">
          <span class="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <circle cx="10" cy="10" r="4" />
            </svg>
            {{ t('experience.currentBadge') }}
          </span>
        </div>
      </div>

      <div>
        <label class="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">{{ t('experience.responsabilities') }}</label>
        <textarea
          v-model="exp.responsabilities"
          :placeholder="t('experience.responsabilitiesPlaceholder')"
          class="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition"
          rows="5"
        />
      </div>

      <label class="inline-flex items-center gap-2.5 cursor-pointer select-none group">
        <input
          type="radio"
          name="current-experience"
          :checked="exp.current"
          @change="setCurrentExperience(exp.id)"
          class="w-4 h-4 accent-indigo-600 cursor-pointer"
        />
        <span class="text-sm text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {{ t('experience.currentJob') }}
        </span>
      </label>
    </div>

    <button
      type="button"
      @click="addExperience"
      class="w-full py-2.5 flex items-center justify-center gap-2 border border-dashed border-indigo-300 hover:border-indigo-500 dark:border-slate-700 dark:hover:border-indigo-400 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20 text-sm font-semibold rounded-lg transition cursor-pointer"
    >
      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
      {{ t('experience.addButton') }}
    </button>
  </div>
</template>
