<script setup lang="ts">
import { ref } from "vue";
// import Typewriter from "./components/Typewriter.vue";
//import { Typewriter } from "./dist/types/compone";
import { Typewriter } from "vue-simple-typewriter";
import 'vue-simple-typewriter/dist/style.css';
const data = ref<string[]>(["Eat", "Sleep", "Code"]);

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
  <div>
    <span class="about">Life is </span>
    <Typewriter
      :words="data"
      :loop="0"
      :delay-speed="1500"
      :delete-speed="80"
      :type-speed="80"
      :cursor="true"
      :cursor-blinking="false"
      :cursor-style="'|'"
      :cursor-color="'#000000'"
      :on-loop-done="onLoopDone"
      :on-delay="onDelay"
      :on-delete="onDelete"
      :on-type="onType"
      class="text"
    />
  </div>
</template>

<style scoped>
.text {
  font-size: 48px;
  color: red;
}

.about {
  font-size: 54px;
  color: black;
}
</style>
