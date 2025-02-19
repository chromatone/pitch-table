<template lang="pug">
.flex
  .flex.flex-col.w-full.flex-auto
    .px-4.flex.items-center
      a.text-xl.mb-1(href="https://chromatone.center", target="_blank") Chromatone
      .flex-auto.flex.p-2.items-center
        ControlSwitch(
          label="letters",
          :state="state.show.letters",
          @click="state.show.letters = !state.show.letters"
        )
        ControlSwitch(
          label="FREQ",
          :state="state.show.hz",
          @click="state.show.hz = !state.show.hz"
        )
        ControlSwitch(
          label="BPM",
          :state="state.show.bpm",
          @click="state.show.bpm = !state.show.bpm"
        )
      DarkMode
    
    .flex.flex-col
      NoteShift(:top="true")
      .flex(v-for="octave in state.octave.list", :key="octave")
        NoteCell(v-for="note in notes", :key="note.name", :note="note", :octave="octave") 
      NoteShift
  .scroll-bar 
</template>

<script setup>
import ControlSwitch from './components/ControlSwitch.vue';
import DarkMode from './components/DarkMode.vue';
import NoteCell from './components/NoteCell.vue';
import NoteShift from './components/NoteShift.vue';

import { notes } from './store/theory.js'
import { state } from './store/state.js'
</script>

<style lang="postcss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  @apply bg-gray-100 dark:(bg-gray-700 text-gray-100);
}

body {
  min-height: 100vh;
}

.scroll-bar {
  @apply min-w-6 bg-gray-200 dark:bg-gray-500;
  background-image: linear-gradient(0deg,
      transparent 80%,
      hsla(0, 0%, 0%, 0.2) 20%);
  background-blend-mode: multiply;
  background-size: 20px 4px;
}
</style>
