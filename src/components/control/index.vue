<template lang="pug">
.flex.p-4
  control-switch(
    label="letters",
    :state="state.show.letters",
    @click="state.show.letters = !state.show.letters"
  )
  control-switch(
    label="FREQ",
    :state="state.show.frequency",
    @click="state.show.frequency = !state.show.frequency"
  )
  control-switch(
    label="BPM",
    :state="state.show.bpm",
    @click="state.show.bpm = !state.show.bpm"
  )
</template>

<script setup>
import { state } from '@store/state.js'
</script>

<style  scoped>
</style>