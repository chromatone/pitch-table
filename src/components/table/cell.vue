<template lang="pug">
.cell(
  v-drag="dragHandler",
  :drag-options=`{
    filterTaps: true
  }`,
  :style=`{
    backgroundColor: color,
    color: textColor
  }`, 
  :class="{ active }")
  .absolute.w-full.h-full.top-0.left-0.bottom-0
    .absolute.border-t.bg-gray-700.bg-opacity-50.w-full.bottom-0(
      :style="{ height: voice.vol + '%' }"
    ) 
  .absolute.h-full.top-0.left-0.right-0.text-center
    .pan.absolute.bg-gray-100.bg-opacity-50.h-full.m-auto(
      :style="{ left: voice.pan + '%' }"
    ) 
  .letter.text-xl.px-1(v-if="state.show.letters") {{ note.name }}
  table-frequency(:pitch="note.pitch", :octave="octave")
</template>

<script setup>
import { defineProps, computed, ref, reactive } from 'vue'
import { state } from '@store/state.js'
const props = defineProps({
  note: Object,
  octave: {
    default: 3,
    type: Number,
  }
});

const voice = reactive({
  vol: 0,
  pan: 50,
})

const active = computed(() => {
  return voice.vol > 0
})

const dragHandler = (dragEvent) => {
  let { movement: [x, y], dragging, tap } = dragEvent
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
    (active.value ? "100" : "75") +
    "%," +
    Math.abs(props.octave + 2) * 8 +
    "%)"
  );
})


const textColor = computed(() => {
  // here's a better algo https://codepen.io/cferdinandi/pen/Yomroj
  if (Math.abs(props.octave + 2) * 8 > 40) {
    return "hsla(0,0%,0%," + (active.value ? "1" : "0.8") + ")";
  } else {
    return "hsla(0,0%,100%," + (active.value ? "1" : "0.8") + ")";
  }
})



</script>

<style  scoped>
.cell {
  @apply relative border border flex flex-col py-4 flex-1 cursor-pointer select-none opacity-50 hover:opacity-100;
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