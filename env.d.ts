/// <reference types="vite/client" />

import type { RouterView, RouterLink } from 'vue-router';
import LoadingSpinner from '@/components/ui-elements/LoadingSpinner.vue';
import CustomFileUpload from '@/components/field/CustomFileUpload.vue';

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    RouterLink: typeof RouterLink;
    RouterView: typeof RouterView;
    LoadingSpinner: typeof LoadingSpinner;
    CustomFileUpload: typeof CustomFileUpload;
  }
}
