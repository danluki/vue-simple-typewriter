<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Typewriter from "./components/Typewriter.vue";

const data = ref<string[]>(["React", "Vue", "Angular"]);
</script>

<template><Typewriter :words="data" class="text" /></template>

<style scoped>
.text {
  font-size: 48px;
  color: red;
}
</style>
