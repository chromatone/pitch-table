<template lang="pug">
.cell(:style="{ backgroundColor: color, color: textColor }")
  .letter.text-xl.px-1(v-if="state.show.letters") {{ note.name }}
  table-frequency(:pitch="note.pitch", :octave="octave")
</template>

<script setup>
import { defineProps, computed, ref } from 'vue'
import { state } from '@store/state.js'
const props = defineProps({
  note: Object,
  octave: {
    default: 3,
    type: Number,
  }
});

const active = ref(false)

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
  @apply flex flex-col py-4 flex-1 cursor-pointer select-none opacity-50 hover:opacity-100;
  transition: all 100ms ease;
  min-width: 2em;
  min-height: 2em;
}
</style>