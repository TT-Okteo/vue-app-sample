<template>
  <small class="text-red-400 dark:text-red-300 text-sm/4">
    {{ errorMessage || '&nbsp;' }}
  </small>
</template>

<script setup lang="ts">
defineProps<{
  errorMessage?: string;
}>();
</script>
