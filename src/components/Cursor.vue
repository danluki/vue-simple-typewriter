<template>
  <span
    style="{{ color: props.cursorColor}}"
    :class="props.cursorBlinking ? 'blinkingCursor blinking' : 'blinkingCursor'"
  >
    {{ props.cursorStyle }}
  </span>
</template>

<script setup lang="ts">
interface CursorProps {
  /**Enable cursor bliking animation */
  cursorBlinking?: boolean;
  /**Change cursor color */
  cursorColor?: string;
  /**Change cursor style */
  cursorStyle?: string;
}

const props = withDefaults(defineProps<CursorProps>(), {
  cursorBlinking: true,
  cursorColor: "inherit",
  cursorStyle: "|",
});
</script>

<style scoped>
.blinkingCursor {
  position: relative;
  font: inherit;
  color: inherir;
  line-height: inherit;
  left: 3px;
  top: 0;
  opacity: 1;
}

.blinking {
  animation-name: blink;
  animation-duration: 0.8s;
  animation-iteration-count: infinite;
}

@keyframes blink {
  0% {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}
</style>
