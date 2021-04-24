<template lang="pug">
.cell(
  v-drag="dragHandler",
  :drag-options="dragOptions",
  :style=`{
    backgroundColor: color,
    color: textColor
  }`, 
  :class="{ active }")
  .absolute.w-full.h-full.top-0.left-0.bottom-0(v-show="voice.vol > 0")
    .absolute.border-t.bg-gray-700.bg-opacity-50.w-full.bottom-0(
      :style="{ height: voice.vol + '%' }"
    ) 
  .absolute.h-full.top-0.left-0.right-0.text-center(v-show="voice.pan != 50")
    .pan.absolute.bg-gray-100.bg-opacity-50.h-full.m-auto(
      :style="{ left: voice.pan + '%' }"
    ) 

  note-info(:name="note.name",:hz="voice.freq", :octave="octave")
</template>

<script setup>
import { defineProps, computed, ref, reactive, watch } from 'vue'
import { Oscillator, gainToDb, PanVol } from 'tone'
import { state } from '@store/state.js'
import { calcFreq } from '@composables/calculations.js'
const props = defineProps({
  note: Object,
  octave: {
    default: 3,
    type: Number,
  }
});

const panVol = new PanVol(0, -Infinity).toDestination()
const osc = new Oscillator(440, 'sawtooth').connect(panVol)

const voice = reactive({
  vol: 0,
  pan: 50,
  started: false,
  freq: computed(() => {
    let freq = calcFreq(props.note.pitch, props.octave)
    osc.frequency.value = freq
    return freq
  })
})

watch(() => voice.vol, (vol) => {
  panVol.volume.targetRampTo(gainToDb(vol * .4 / 100))
})

watch(() => voice.pan, (pan) => {
  let place = ((pan - 50) / 100) * 2
  panVol.pan.targetRampTo(place)
})

const active = computed(() => {
  return voice.vol > 0
})

const dragOptions = reactive({
  filterTaps: true,
  preventWindowScrollY: true,
  delay: 0,
  eventOptions: {
    passive: false
  }
})

const dragHandler = (dragEvent) => {
  dragEvent.event.preventDefault()
  let { movement: [x, y], dragging, tap } = dragEvent
  if (!voice.started) {
    osc.start()
    voice.started = true
  }
  if (!tap) {
    voice.vol += -y / 20
    if (voice.vol > 100) voice.vol = 100
    if (voice.vol < 0) voice.vol = 0

    voice.pan += x / 20

    if (voice.pan > 100) voice.pan = 100
    if (voice.pan < 0) voice.pan = 0
  } else {
    voice.vol = 0;
    voice.pan = 50
  }
}

const color = computed(() => {
  return (
    "hsla(" +
    props.note.pitch * 30 +
    "," +
    (active.value ? "100" : "25") +
    "%," +
    Math.abs(props.octave + 2) * 8 +
    "%)"
  );
})

const textColor = computed(() => {
  // here's a nice algo for HEX colors https://codepen.io/cferdinandi/pen/Yomroj 
  if (Math.abs(props.octave + 2) * 8 > 40) {
    return "hsla(0,0%,0%," + (active.value ? "1" : "0.8") + ")";
  } else {
    return "hsla(0,0%,100%," + (active.value ? "1" : "0.8") + ")";
  }
});




</script>

<style  scoped>
.cell {
  @apply relative  flex flex-col p-1 flex-1 cursor-pointer select-none opacity-70 hover:opacity-100;
  transition: all 100ms ease;
  min-width: 2em;
  min-height: 2em;
}
.cell.active {
  @apply opacity-90;
}

.volume {
  width: 6px;
  @apply flex items-end;
}

.pan {
  left: 50%;
  width: 1px;
  transform: translateX(-2.5px);
}
</style>