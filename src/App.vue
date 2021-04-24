<template lang="pug">
.flex.flex-col.w-full.flex-auto
  control
  .flex(v-for="octave in octaves", :key="octave")
    table-cell(v-for="note in notes", :key="note.name", :note="note", :octave="octave") 
</template>

<script setup>
import { computed } from 'vue'
import { notes } from '@store/theory.js'
const octaveRange = [-6, 9];

const octaves = computed(() => {
  let octaves = [];
  for (let i = octaveRange[1]; i >= octaveRange[0]; i--) {
    octaves.push(i)
  }
  return octaves
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
