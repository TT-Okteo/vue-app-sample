declare module 'vue' {
  export interface GlobalComponents {
    PButton: (typeof import('primevue/button'))['default'];
    PDialog: (typeof import('primevue/dialog'))['default'];
    PMenu: (typeof import('primevue/menu'))['default'];
    PTextarea: (typeof import('primevue/textarea'))['default'];
    PSelect: (typeof import('primevue/select'))['default'];
    LoadingSpinner: (typeof import('@/components/ui-elements/LoadingSpinner.vue'))['default'];
  }
}

export {};
