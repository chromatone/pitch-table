<template lang="pug">
.flex
  .flex.flex-col.w-full.flex-auto
    header-row
    control-row
    note-table
  .scroll-bar 
</template>

<script setup>

</script>

<style>
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
  background-image: linear-gradient(
    0deg,
    transparent 80%,
    hsla(0, 0%, 0%, 0.2) 20%
  );
  background-blend-mode: multiply;
  background-size: 20px 4px;
}
</style>
