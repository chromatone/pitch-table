<template lang="pug">
.icon(@click="toggleDark()")
  la-sun.ml-2(v-if="!isDark")
  la-moon.mx-2(v-else)
</template>

<script setup>
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<style  scoped>
</style>