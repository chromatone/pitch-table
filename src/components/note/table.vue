<template lang="pug">
.flex.flex-col
  .flex(v-for="octave in state.octaves", :key="octave")
    note-cell(v-for="note in notes", :key="note.name", :note="note", :octave="octave") 
</template>

<script setup>
import { notes } from '@store/theory.js'
import { state } from '@store/state.js'

</script>

<style  scoped>
</style>