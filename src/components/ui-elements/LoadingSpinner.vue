<template>
  <div class="flex justify-center items-center flex-1">
    <em class="pi pi-spinner pi-spin text-primary" :class="[spinnerSizeClass ? spinnerSizeClass : 'text-8xl']" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  spinnerSizeClass?: string;
}>();
</script>
