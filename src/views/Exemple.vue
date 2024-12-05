<template>
  <div class="grid grid-cols-12 gap-4">
    <div class="col-span-12">
      <div v-for="c of nombreCartes" :key="c" class="card">
        <h5>Page vide</h5>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni odio, doloribus placeat reiciendis eius dolores quibusdam
          accusantium, assumenda quo molestias vitae, et natus quas itaque odit quaerat maiores delectus sit.
        </p>
      </div>
    </div>
  </div>
  <PButton label="Ajouter une carte" @click="ajouterCarte()" />
  <PButton label="Supprimer une carte" class="ml-4" @click="supprimerCarte()" />

</template>

<script setup lang="ts">
import { ref } from 'vue';

const nombreCartes = ref(1);

function ajouterCarte() {
  nombreCartes.value++;
}

function supprimerCarte() {
  nombreCartes.value--;
}
</script>
