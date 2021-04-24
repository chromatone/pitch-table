import { reactive } from 'vue'

export const state = reactive({
  show: {
    letters: true,
    bpm: true,
    hz: true,
  },
  rootFreq: 440,
  tuning: 'equal',
})
