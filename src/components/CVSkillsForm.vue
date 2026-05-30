<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps<{
  skills: {
    soft: string[];
    hard: string[];
  };
  addSkill: (type: 'soft' | 'hard', name: string) => void;
  removeSkill: (type: 'soft' | 'hard', index: number) => void;
}>();

const currentHardSkill = ref('');
const currentSoftSkill = ref('');

const handleAddHardSkill = () => {
  if (currentHardSkill.value.trim()) {
    props.addSkill('hard', currentHardSkill.value);
    currentHardSkill.value = '';
  }
};

const handleAddSoftSkill = () => {
  if (currentSoftSkill.value.trim()) {
    props.addSkill('soft', currentSoftSkill.value);
    currentSoftSkill.value = '';
  }
};
</script>

<template>
  <div class="space-y-6">
    <!-- Hard Skills -->
    <div class="space-y-2">
      <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300">{{ t('skills.hardTitle') }}</label>
      <div class="flex gap-2">
        <input
          type="text"
          v-model="currentHardSkill"
          @keydown.enter.prevent="handleAddHardSkill"
          :placeholder="t('skills.hardPlaceholder')"
          class="flex-1 px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition"
        />
        <button
          type="button"
          @click="handleAddHardSkill"
          class="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition shrink-0 cursor-pointer shadow-sm"
        >
          {{ t('skills.addButton') }}
        </button>
      </div>

      <div class="flex flex-wrap gap-1.5 pt-2">
        <span
          v-for="(skill, index) in skills.hard"
          :key="'hard-' + index"
          class="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/30 rounded-full"
        >
          {{ skill }}
          <button type="button" @click="removeSkill('hard', index)" class="text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-200 transition-colors cursor-pointer">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </span>
        <p v-if="skills.hard.length === 0" class="text-xs text-slate-400 italic">{{ t('skills.noHard') }}</p>
      </div>
    </div>

    <!-- Soft Skills -->
    <div class="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-900">
      <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300">{{ t('skills.softTitle') }}</label>
      <div class="flex gap-2">
        <input
          type="text"
          v-model="currentSoftSkill"
          @keydown.enter.prevent="handleAddSoftSkill"
          :placeholder="t('skills.softPlaceholder')"
          class="flex-1 px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition"
        />
        <button
          type="button"
          @click="handleAddSoftSkill"
          class="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition shrink-0 cursor-pointer shadow-sm"
        >
          {{ t('skills.addButton') }}
        </button>
      </div>

      <div class="flex flex-wrap gap-1.5 pt-2">
        <span
          v-for="(skill, index) in skills.soft"
          :key="'soft-' + index"
          class="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-full"
        >
          {{ skill }}
          <button type="button" @click="removeSkill('soft', index)" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </span>
        <p v-if="skills.soft.length === 0" class="text-xs text-slate-400 italic">{{ t('skills.noSoft') }}</p>
      </div>
    </div>
  </div>
</template>
