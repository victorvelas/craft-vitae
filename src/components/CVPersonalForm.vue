<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import type { PersonalInfo } from '../types/cv';

const { t } = useI18n();

const props = defineProps<{
  personalInfo: PersonalInfo;
  uploadPhoto: (file: File) => Promise<void>;
  removePhoto: () => void;
}>();

const handlePhotoChange = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    try {
      await props.uploadPhoto(target.files[0]);
    } catch (err: any) {
      alert(t('actions.photoError', { msg: err.message || err }));
    }
  }
};
</script>

<template>
  <div class="space-y-4">
    <!-- Photo Upload -->
    <div class="flex items-center gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-700">
      <div class="relative w-20 h-20 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center overflow-hidden border-2 border-slate-300 dark:border-slate-700 shrink-0">
        <img v-if="personalInfo.photo" :src="personalInfo.photo" class="w-full h-full object-cover" alt="Profile" />
        <svg v-else class="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>
      <div class="flex-1 space-y-2">
        <label class="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          {{ t('personal.photoLabel') }}
        </label>
        <div class="flex gap-2">
          <label class="px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md cursor-pointer transition shadow-sm">
            {{ t('personal.uploadPhoto') }}
            <input type="file" accept="image/*" @change="handlePhotoChange" class="hidden" />
          </label>
          <button
            v-if="personalInfo.photo"
            type="button"
            @click="removePhoto"
            class="px-3 py-1.5 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-md border border-rose-200 dark:border-rose-900/50 transition cursor-pointer"
          >
            {{ t('personal.removePhoto') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Sub Title -->
    <div>
      <label class="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">{{ t('personal.subTitle') }}</label>
      <input
        type="text"
        v-model="personalInfo.subTitle"
        :placeholder="t('personal.subTitlePlaceholder')"
        maxlength="150"
        class="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition"
      />
    </div>

    <!-- Name Inputs -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">{{ t('personal.firstName') }}</label>
        <input
          type="text"
          v-model="personalInfo.firstName"
          :placeholder="t('personal.firstNamePlaceholder')"
          class="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition"
        />
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">{{ t('personal.lastName') }}</label>
        <input
          type="text"
          v-model="personalInfo.lastName"
          :placeholder="t('personal.lastNamePlaceholder')"
          class="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition"
        />
      </div>
    </div>

    <!-- Contact details -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">{{ t('personal.email') }}</label>
        <input
          type="email"
          v-model="personalInfo.email"
          :placeholder="t('personal.emailPlaceholder')"
          class="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition"
        />
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">{{ t('personal.phone') }}</label>
        <input
          type="text"
          v-model="personalInfo.phone"
          :placeholder="t('personal.phonePlaceholder')"
          class="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition"
        />
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">{{ t('personal.website') }}</label>
        <input
          type="text"
          v-model="personalInfo.website"
          :placeholder="t('personal.websitePlaceholder')"
          class="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition"
        />
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">{{ t('personal.address') }}</label>
        <input
          type="text"
          v-model="personalInfo.address"
          :placeholder="t('personal.addressPlaceholder')"
          class="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition"
        />
      </div>
    </div>

    <!-- Profiles -->
    <div>
      <label class="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">{{ t('personal.profile') }}</label>
      <textarea
        v-model="personalInfo.profile"
        rows="3"
        :placeholder="t('personal.profilePlaceholder')"
        class="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition resize-y"
      ></textarea>
    </div>
    <div>
      <label class="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">{{ t('personal.aboutMe') }}</label>
      <textarea
        v-model="personalInfo.aboutMe"
        rows="3"
        :placeholder="t('personal.aboutMePlaceholder')"
        class="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition resize-y"
      ></textarea>
    </div>
  </div>
</template>
