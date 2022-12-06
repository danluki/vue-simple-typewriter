<template>
  <span>
    {{ text }}
    <Cursor
      :cursor-blinking="props.cursorBlinking"
      :cursor-color="props.cursorColor"
      :cursor-style="props.cursorStyle"
    />
  </span>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import Cursor from "./Cursor.vue";

interface Props {
  /**Array of words */
  words: string[];
  /**Character typing speed in Milliseconds*/
  typeSpeed?: number;
  /**Deleting speed in Milliseconds*/
  deleteSpeed?: number;
  /**Delay between words in Milliseconds*/
  delaySpeed?: number;
  /**How many times to run. 0 to run infinitely*/
  loop?: number;
  /**Is cursor needs to be shown? */
  cursor?: boolean;
  onLoopDone?: () => void;
  /**Callback that is triggered while typing with `typed` words count passed */
  onType?: (count: number) => void;
  /**Callback that is triggered while deleting*/
  onDelete?: () => void;
  /**Callback that is triggered on typing delay*/
  onDelay?: () => void;
  /**Enable cursor bliking animation */
  cursorBlinking?: boolean;
  /**Change cursor color */
  cursorColor?: string;
  /**Change cursor style */
  cursorStyle?: string;
}

const props = withDefaults(defineProps<Props>(), {
  typeSpeed: 80,
  deleteSpeed: 50,
  delaySpeed: 1500,
  loop: 0,
  cursor: true,
  cursorBlinking: true,
  cursorColor: "'#000000'",
  cursorStyle: "_",
});

const loops = ref(0);
const isDone = ref(false);
const isDelete = ref(false);
const isType = ref(false);
const isDelay = ref(false);

const text = ref("");
const count = ref(0);
const speed = ref(props.typeSpeed);

const handleTyping = () => {
  const index = count.value % props.words.length;
  const fullWord = props.words[index];

  if (!isDelete.value) {
    typeWord(fullWord);
    isType.value = true;

    if (text.value === fullWord) {
      delay(props.delaySpeed);
      isType.value = false;
      isDelay.value = true;

      setTimeout(() => {
        isDelay.value = false;
        isDelete.value = true;
      }, props.delaySpeed);

      if (props.loop > 0) {
        loops.value += 1;
        if (loops.value / props.words.length === props.loop) {
          isDelay.value = false;
          isDone.value = true;
        }
      }
    }
  } else {
    deleteWord(fullWord, props.deleteSpeed);
    if (text.value === "") {
      isDelete.value = false;
      addCount();
    }
  }
  if (isType.value) {
    if (props.onType) {
      props.onType(count.value);
    }
  }

  if (isDelete.value) {
    if (props.onDelete) {
      props.onDelete();
    }
  }

  if (isDelay.value) {
    if (props.onDelay) {
      props.onDelay();
    }
  }
};

const typeWord = (fullWord: string) => {
  text.value = fullWord.substring(0, text.value.length + 1);
  speed.value = props.typeSpeed;
};

const delay = (delaySpeed: number) => {
  speed.value = delaySpeed;
};

const deleteWord = (fullWord: string, deleteSpeed: number) => {
  text.value = fullWord.substring(0, text.value.length - 1);
  speed.value = deleteSpeed;
};

const addCount = () => {
  count.value += 1;
};

watchEffect(() => {
  const typing = setTimeout(handleTyping, speed.value, text.value);
  if (isDone.value) {
    clearTimeout(typing);
  }

  if (!props.onLoopDone) return;
  if (isDone.value) {
    props.onLoopDone();
  }
});
</script>

<style scoped></style>
