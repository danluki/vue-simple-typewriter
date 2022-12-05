<template>
  <div>
    {{ text }}
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';

interface TypewriterProps {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  delaySpeed?: number;
  loop?: number;
  cursor?: boolean;
  cursorBlinking?: boolean;
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
}

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
  //if (onType)
}

if (isDelete.value) {

}

if (isDelay.value) {

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
});
</script>

<style scoped>


</style>