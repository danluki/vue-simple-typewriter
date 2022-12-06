<template>
  <span>
    {{ text }}
    <Cursor
      :cursor-blinking="true"
      :cursor-color="'#000000'"
      :cursor-style="'|'"
    />
  </span>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import Cursor from "./Cursor.vue";

interface TypewriterProps {
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
}

const props = withDefaults(defineProps<TypewriterProps>(), {
  typeSpeed: 80,
  deleteSpeed: 50,
  delaySpeed: 1500,
  loop: 0,
  cursor: false,
  cursorBlinking: false,
});

const loops = ref<number>(0);
const isDone = ref<boolean>(false);
const isDelete = ref<boolean>(false);
const isType = ref<boolean>(false);
const isDelay = ref<boolean>(false);

const text = ref<string>("");
const count = ref<number>(0);
const speed = ref<number>(props.typeSpeed);

const handleTyping = () => {
  const index = count.value % props.words.length;
  console.log(index);
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

watchEffect(() => {
  const typing = setTimeout(handleTyping, speed.value);
  console.log(text.value);
  if (isDone.value) {
    clearTimeout(typing);
  }
});

watchEffect(() => {
  if (isDone.value) {
    //
  }

  if (!props.onLoopDone) return;

  if (isDone.value) {
    props.onLoopDone();
  }
});
</script>

<style scoped></style>
