<script setup>
import { computed, ref, reactive, watch } from 'vue'
import { Oscillator, context, start, gainToDb, PanVol, MonoSynth } from 'tone'

import { state } from '../store/state.js'
import { calcFreq } from '../composables/calculations.js'
import { useSynth } from '../composables/synth.js'

const props = defineProps({
  note: Object,
  octave: {
    default: 3,
    type: Number,
  }
});

const synth = useSynth(props.note.pitch, props.octave);

const dragOptions = reactive({
  filterTaps: true,
  preventWindowScrollY: true,
  delay: 0,
  eventOptions: {
    passive: false
  }
})

const dragHandler = (dragEvent) => {
  if (context.state == 'suspended') {
    start()
  }
  let { movement: [x, y], dragging, tap } = dragEvent
  if (!tap) {
    synth.vol += -y / 20
    if (synth.vol > 100) synth.vol = 100
    if (synth.vol < 0) synth.vol = 0

    synth.pan += x / 20

    if (synth.pan > 100) synth.pan = 100
    if (synth.pan < 0) synth.pan = 0
  } else {
    if (synth.active) {
      synth.vol = 0;
      synth.pan = 50
    } else {
      synth.vol = 50
    }

  }
}

const color = computed(() => {
  return (
    "hsla(" +
    props.note.pitch * 30 +
    "," +
    (synth.active ? "100" : "25") +
    "%," +
    Math.abs(props.octave + 2) * 8 +
    "%)"
  );
})

const textColor = computed(() => {
  // here's a nice algo for HEX colors https://codepen.io/cferdinandi/pen/Yomroj 
  if (Math.abs(props.octave + 2) * 8 > 40) {
    return "hsla(0,0%,0%," + (synth.active ? "1" : "0.8") + ")";
  } else {
    return "hsla(0,0%,100%," + (synth.active ? "1" : "0.8") + ")";
  }
});

function round(value) {
  let result
  if (value > 1e6) {
    result = (value / 1e6).toFixed(2) + ' M'
  } else if (value > 1e3) {
    result = (value / 1e3).toFixed(2) + ' k'
  } else {
    result = value.toFixed(2) + ' '
  }
  return result
}

</script>


<template lang="pug">
.cell(
  v-drag="dragHandler",
  :drag-options="dragOptions",
  :style=`{
    backgroundColor: color,
    color: textColor
  }`, 
  :class="{ active: synth.active }")
  .absolute.w-full.h-full.top-0.left-0.bottom-0(v-show="synth.vol > 0")
    .volume(
      :style="{ height: synth.vol + '%' }"
    ) 
  .absolute.h-full.top-0.left-0.right-0.text-center(v-show="synth.pan != 50")
    .pan.absolute.bg-gray-100.h-full.m-auto(
      :style="{ left: synth.pan + '%' }"
    ) 

  .flex.flex-col.text-xs.p-1(v-if="state.show.hz || state.show.bpm || state.show.letters")
  .text-xl.font-bold(v-if="state.show.letters") {{ note.name }}{{ octave }}
  .flex.text-xs(v-if="state.show.hz") {{ round(synth.freq) }}hz
  .flex.text-xs(v-if="state.show.bpm") {{ round(synth.freq*60) }}BPM
</template>

<style scoped>
.cell {
  @apply relative flex flex-col p-2 flex-1 cursor-pointer select-none;
  transition: all 100ms ease;
  min-width: 2em;
  min-height: 4em;
}

.cell.active,
.cell:active {
  @apply;
}

.volume {
  mix-blend-mode: multiply;
  @apply absolute border-t bg-gray-500 w-full bottom-0;
}

.pan {
  left: 50%;
  width: 1px;
  transform: translateX(-2.5px);
}
</style>