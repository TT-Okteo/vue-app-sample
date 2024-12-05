<template>
  <div :class="containerClass" @click="onWrapperClick">
    <ErrorDialog v-model:display-error-dialog="displayErrorDialog" v-model:error-label="errorLabel" />
    <Toast />
    <ConfirmPopup />
    <AppTopBar :static-menu-inactive="staticMenuInactive" :mobile-menu-active="mobileMenuActive" @menu-toggle.prevent="onMenuToggle" />
    <div class="layout-sidebar" @click="onSidebarClick">
      <AppMenu :model="menu" @menuitem-click="onMenuItemClick" />
    </div>

    <div class="layout-main-container">
      <div class="layout-main" :class="{ 'flex align-items-stretch': isFallbackDisplayed }">
        <RouterView v-slot="{ Component }">
          <template v-if="Component">
            <div :class="{ 'flex items-stretch flex-1': isFallbackDisplayed }">
              <ReloadPWA />
              <Suspense timeout="0" @fallback="onFallback()" @resolve="onResolve()">
                <component :is="Component" />
                <template #fallback>
                  <LoadingSpinner />
                </template>
              </Suspense>
            </div>
          </template>
        </RouterView>
      </div>
    </div>

    <transition name="layout-mask">
      <div v-if="mobileMenuActive" class="layout-mask p-component-overlay"></div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import AppMenu from '@/AppMenu.vue';
import AppTopBar from '@/AppTopbar.vue';
import ErrorDialog from '@/components/dialog/ErrorDialog.vue';
import ReloadPWA from '@/components/ReloadPWA.vue';
import { useErrorService } from '@/composables/ErrorService';
import { usePrimeVue } from 'primevue/config';
import type { MenuItem } from 'primevue/menuitem';
import { useToast } from 'primevue/usetoast';
import { computed, onBeforeUpdate, onErrorCaptured, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import ErrorCause from './constants/ErrorCause';
import { useUtilsService } from '@/composables/UtilsService';

const route = useRoute();
const primevue = usePrimeVue();
const toast = useToast();

const { displayErrorDialog, errorLabel } = useErrorService();
const { isLoading, isLoading2, isDialogLoading, isButtonLoading } = useUtilsService();

const layoutMode = ref('static');
const staticMenuInactive = ref(false);
const overlayMenuActive = ref(false);
const mobileMenuActive = ref(false);
const menuActive = ref();
const menuClick = ref();
const isFallbackDisplayed = ref(false);
const menu = ref([
  {
    label: 'Accueil',
    items: [
      {
        label: 'Tableau de bord',
        icon: 'pi pi-fw pi-home',
        to: '/',
      },
    ],
  },
  {
    label: 'Page exemple',
    icon: 'pi pi-fw pi-sitemap',
    items: [{ label: 'Exemple', icon: 'pi pi-fw pi-circle-off', to: '/exemple' }],
  },
]);

const containerClass = computed(() => {
  return [
    'layout-wrapper',
    {
      'layout-overlay': layoutMode.value === 'overlay',
      'layout-static': layoutMode.value === 'static',
      'layout-static-sidebar-inactive': staticMenuInactive.value && layoutMode.value === 'static',
      'layout-overlay-sidebar-active': overlayMenuActive.value && layoutMode.value === 'overlay',
      'layout-mobile-sidebar-active': mobileMenuActive.value,
      'p-input-filled': primevue.config.inputVariant === 'filled',
      'p-ripple-disabled': primevue.config.ripple === false,
    },
  ];
});

watch(route, () => {
  menuActive.value = false;
  toast.removeAllGroups();
});

onBeforeUpdate(() => {
  if (mobileMenuActive.value) addClass(document.body, 'body-overflow-hidden');
  else removeClass(document.body, 'body-overflow-hidden');
});

onErrorCaptured((e) => {
  console.log(e);
  if (!displayErrorDialog.value) {
    displayErrorDialog.value = true;
    if (e.cause && e.cause === ErrorCause.CUSTOM_UNEXPECTED_ERROR) {
      errorLabel.value = e.message;
    } else {
      errorLabel.value = "Une erreur s'est produite.";
    }
  }
  isLoading.value = false;
  isLoading2.value = false;
  isDialogLoading.value = false;
  isButtonLoading.value = false;
  return false;
});

function onWrapperClick() {
  if (!menuClick.value) {
    overlayMenuActive.value = false;
    mobileMenuActive.value = false;
  }

  menuClick.value = false;
}

function onMenuToggle() {
  menuClick.value = true;

  if (isDesktop()) {
    if (layoutMode.value === 'overlay') {
      if (mobileMenuActive.value === true) {
        overlayMenuActive.value = true;
      }

      overlayMenuActive.value = !overlayMenuActive.value;
      mobileMenuActive.value = false;
    } else if (layoutMode.value === 'static') {
      staticMenuInactive.value = !staticMenuInactive.value;
    }
  } else {
    mobileMenuActive.value = !mobileMenuActive.value;
  }
}

function onSidebarClick() {
  menuClick.value = true;
}

function onMenuItemClick(event: { item: MenuItem }) {
  if (event.item && !event.item.items) {
    overlayMenuActive.value = false;
    mobileMenuActive.value = false;
  }
}

function addClass(element: HTMLElement, className: string) {
  if (element.classList) element.classList.add(className);
  else element.className += ' ' + className;
}

function removeClass(element: HTMLElement, className: string) {
  if (element.classList) element.classList.remove(className);
  else element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
}

function isDesktop() {
  return window.innerWidth >= 1024;
}

function onFallback() {
  isFallbackDisplayed.value = true;
}

function onResolve() {
  isFallbackDisplayed.value = false;
}
</script>
