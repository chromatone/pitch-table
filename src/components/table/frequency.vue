<template lang="pug">
.flex.flex-col.text-xs.p-1
  .flex(v-if="state.show.frequency") {{ round(hz) }}hz
  .flex(v-if="state.show.bpm") {{ round(bpm) }}BPM
</template>

<script setup>
import { defineProps, computed } from 'vue'
import { state } from '@store/state'
import { justCents } from '@store/theory'
const props = defineProps({
  pitch: {
    type: Number,
    default: 0
  },
  octave: {
    default: 3,
    type: Number,
  }
});

const hz = computed(() => {
  let freq = calcFreq(props.pitch, props.octave)
  return freq
})

const bpm = computed(() => {
  return (hz.value * 60).toFixed(1)
})

function round(value) {
  if (value > 1e6) {
    value = (value / 1e6).toFixed(2) + ' M'
  }
  if (value > 1e3) {
    value = (value / 1e3).toFixed(2) + ' k'
  }
  return value
}

function calcFreq(pitch = 0, octave = 3, root = state.rootFreq, tuning) {
  let hz = 0;
  if (state.tuning == "equal") {
    hz = Number(root * Math.pow(2, octave - 4 + pitch / 12)).toFixed(2);
  }
  if (state.tuning == "just") {
    let diff = Number(
      Math.pow(Math.pow(2, 1 / 1200), justCents[pitch])
    );
    hz = Number(root * Math.pow(2, octave - 4) * diff).toFixed(2);
  }
  return hz;
}
</script>

<style scoped>
</style>