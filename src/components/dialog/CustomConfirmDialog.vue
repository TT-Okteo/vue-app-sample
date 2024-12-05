<template>
  <PDialog id="customConfirmDialog" v-model:visible="displayConfirmDialog" header="Confirmation" :modal="true" :closable="false">
    <p class="m-0 flex items-center">
      <i class="pi pi-exclamation-triangle mr-4" aria-hidden="true" />
      <span v-if="confirmLabel" id="confirmLabel">
        <span v-for="(part, index) in confirmLabel.split('<b>')" :key="part">
          <b v-if="index % 2 !== 0">
            {{ part }}
          </b>
          <span v-else>
            {{ part }}
          </span>
        </span>
      </span>
    </p>
    <template #footer>
      <PButton id="cancelBtn" :label="cancelBtnLabel ? cancelBtnLabel : 'Cancel'" text @click="cancel()" />
      <PButton id="confirmBtn" :label="confirmBtnLabel ? confirmBtnLabel : 'Confirm'" class="mr-0" @click="confirm()" />
    </template>
  </PDialog>
</template>

<script lang="ts" setup>
import { type NavigationGuardNext } from 'vue-router';

const props = defineProps<{
  navigationGuardNext?: NavigationGuardNext;
  cancelBtnLabel?: string;
  confirmBtnLabel?: string;
}>();
const emit = defineEmits<{
  (e: 'confirm'): void;
}>();

const displayConfirmDialog = defineModel<boolean>('displayConfirmDialog', { required: true });
const confirmLabel = defineModel<string>('confirmLabel', { required: true });

function fermerDialog() {
  displayConfirmDialog.value = false;
  confirmLabel.value = '';
}

function confirm() {
  if (props.navigationGuardNext) props.navigationGuardNext();
  emit('confirm');
  fermerDialog();
}

function cancel() {
  if (props.navigationGuardNext) props.navigationGuardNext(false);
  fermerDialog();
}
</script>

<style scoped>
i {
  font-size: 2rem;
}

span {
  font-family: var(--font-family);
}
</style>
