<template>
  <PDialog v-model:visible="displayErrorDialog" header="Erreur" :modal="true" :closable="false">
    <p class="m-0 flex items-center">
      <i class="pi pi-exclamation-circle mr-4" aria-hidden="true" />
      <span v-if="errorLabel" id="errorLabel">
        <pre>{{ errorLabel }}</pre>
      </span>
      <span v-else id="errorLabel">Une erreur s'est produite.</span>
    </p>
    <template #footer>
      <PButton id="errorDialogCloseBtn" label="Fermer" class="mr-0" @click="closeDialog()" />
    </template>
  </PDialog>
</template>

<script lang="ts" setup>
import { computed, type WritableComputedRef } from 'vue';

const props = defineProps<{ displayErrorDialog: boolean; errorLabel: string }>();
const emit = defineEmits<{
  (e: 'update:displayErrorDialog', p: boolean): void;
  (e: 'update:errorLabel', p: string): void;
}>();

const displayErrorDialog: WritableComputedRef<boolean> = computed({
  get(): boolean {
    return props.displayErrorDialog;
  },
  set(newValue: boolean): void {
    emit('update:displayErrorDialog', newValue);
  },
});

const errorLabel: WritableComputedRef<string> = computed({
  get(): string {
    return props.errorLabel;
  },
  set(newValue: string): void {
    emit('update:errorLabel', newValue);
  },
});

function closeDialog() {
  displayErrorDialog.value = false;
  errorLabel.value = '';
}
</script>

<style scoped>
i {
  font-size: 2rem;
}

span pre {
  font-family: var(--font-family);
}
</style>
