<template>
  <div v-if="needRefresh">
    <Card class="card">
      <template #title> Mise à jour disponible </template>
      <template #content>
        <span> Une nouvelle version de l'application est disponible. Cliquez sur le bouton « Recharger » pour la mettre à jour.</span>
      </template>
      <template #footer>
        <PButton v-if="needRefresh" class="Primary" label="Recharger" @click="updateServiceWorker()" />
        <PButton class="p-button-secondary" label="Fermer" style="margin-left: 0.5em" @click="close" />
      </template>
    </Card>
  </div>
</template>

<script lang="ts" setup>
import { useRegisterSW } from 'virtual:pwa-register/vue';

const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW();
const close = async () => {
  offlineReady.value = false;
  needRefresh.value = false;
};
</script>

<style scoped>
div .p-card {
  margin-bottom: 20px;
  &:deep(.p-card-body) {
    padding: 0;
  }
}
</style>
