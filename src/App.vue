<script setup lang="ts">
import { ref } from "vue";
import Typewriter from "./components/Typewriter.vue";

const data = ref<string[]>(["React", "Vue", "Angular"]);

const onLoopDone = () => {
  console.log("loop done");
};
const onDelay = () => {
  console.log("on Delay");
};
const onDelete = () => {
  console.log("on Delete");
};
const onType = () => {
  console.log("on Type");
};
</script>

<template>
  <Typewriter
    :words="data"
    :loop="0"
    :delay-speed="1500"
    :delete-speed="80"
    :type-speed="80"
    :cursor="true"
    :cursor-blinking="true"
    :cursor-style="'|'"
    :cursor-color="'#000000'"
    :on-loop-done="onLoopDone"
    :on-delay="onDelay"
    :on-delete="onDelete"
    :on-type="onType"
    class="text"
  />
</template>

<style scoped>
.text {
  font-size: 48px;
  color: red;
}
</style>
