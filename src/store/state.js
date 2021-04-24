import { reactive, computed } from 'vue'

export const state = reactive({
  show: {
    letters: true,
    bpm: true,
    hz: true,
  },
  rootFreq: 440,
  tuning: 'equal',
  octaveRange: [-6, 9],
  octaves: computed(() => {
    let octaves = []
    for (let i = state.octaveRange[1]; i >= state.octaveRange[0]; i--) {
      octaves.push(i)
    }
    return octaves
  }),
})
