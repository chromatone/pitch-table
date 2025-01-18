<template lang="pug">
.flex.flex-col
  note-shift(:top="true")
  .flex(v-for="octave in state.octave.list", :key="octave")
    note-cell(v-for="note in notes", :key="note.name", :note="note", :octave="octave") 
  note-shift
</template>

<script setup>
import { notes } from '~/store/theory.js'
import { state } from '~/store/state.js'

</script>

<style scoped></style>