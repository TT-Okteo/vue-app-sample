<template>
  <div class="layout-topbar">
    <PButton class="layout-menu-button layout-topbar-button" link @click="onMenuToggle">
      <em :class="buttonIcon"></em>
    </PButton>
    <router-link to="/" class="layout-topbar-logo">
      <img alt="Logo" :src="topbarImage()" />
      <span>Test technique OKTEO</span>
    </router-link>

    <PButton
      v-styleclass="{
        selector: '@next',
        enterFromClass: 'hidden',
        enterActiveClass: 'animate-scalein',
        leaveToClass: 'hidden',
        leaveActiveClass: 'animate-fadeout',
        hideOnOutsideClick: true,
      }"
      class="layout-topbar-menu-button layout-topbar-button"
      link
    >
      <em class="pi pi-ellipsis-v"></em>
    </PButton>
    <ul class="layout-topbar-menu hidden lg:flex origin-top sm:items-center">
      <li>
        <div class="flex items-center gap-3"  :class="{ 'w-24 border-radius-2rem': windowInnerWidth >= 1024 }">
          <em class="fas fa-moon" ></em>
          <ToggleSwitch v-model="isDarkThemeActivated" @change="changeTheme" />


        </div>
 
      </li>
      <li>
        <div class="flex ml-5" :class="{ 'mt-4': windowInnerWidth <= 1024 }">
          <Avatar size="large" shape="circle" icon="fa-solid fa-user" />
          <div class="hidden sm:flex items-center">
            <div class="text-left mx-6">
              <div id="userLabel">{{ [loggedInUser.firstName, loggedInUser.lastName].join(' ') }}</div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useLoggedInUserService } from './composables/LoggedInUserService';
import { useUtilsService } from './composables/UtilsService';

const props = defineProps<{
  staticMenuInactive: boolean;
  mobileMenuActive: boolean;
}>();

const emit = defineEmits<{
  (e: 'menu-toggle', v: Event): void;
  (e: 'topbar-menu-toggle', v: Event): void;
}>();

const { loggedInUser } = useLoggedInUserService();
const { isDarkThemeActivated } = useUtilsService();

const windowInnerWidth = ref(window.innerWidth);

window.addEventListener('resize', storeWindowInnerWidth);

const htmlElement = document.querySelector('html');

const buttonIcon = computed(() => {
  let icon = 'pi pi-times';
  if ((windowInnerWidth.value >= 1024 && props.staticMenuInactive) || (windowInnerWidth.value < 1024 && !props.mobileMenuActive)) {
    icon = 'pi pi-bars';
  }
  return icon;
});

onMounted(() => {
  if (window.localStorage.getItem('dark-mode')) {
    isDarkThemeActivated.value = window.localStorage.getItem('dark-mode') === 'true';
    if (isDarkThemeActivated.value) changeTheme();
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', storeWindowInnerWidth);
});

function onMenuToggle(event: Event) {
  emit('menu-toggle', event);
}

function topbarImage() {
  return isDarkThemeActivated.value ? '/images/logo-white.svg' : '/images/logo-dark.svg';
}

function storeWindowInnerWidth() {
  windowInnerWidth.value = window.innerWidth;
}

function changeTheme() {
  htmlElement?.classList.toggle('dark');
  window.localStorage.setItem('dark-mode', isDarkThemeActivated.value.toString());
}
</script>

<style scoped>
.border-radius-2rem {
  border-radius: 2rem !important;
}
</style>
