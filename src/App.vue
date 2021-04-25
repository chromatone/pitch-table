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
}

.scroll-bar {
  @apply min-w-6;
  background-color: #eee;
  background-image: linear-gradient(
    0deg,
    transparent 80%,
    hsla(0, 0%, 0%, 0.2) 20%
  );
  background-size: 20px 4px;
}
</style>
