<template>
  <div>
    123
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

interface TypewriterProps {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  delaySpeed?: number;
  loop?: number | boolean;
  cursor?: boolean;
  cursorBlinking?: boolean;
}

const props = withDefaults(defineProps<TypewriterProps>(), {
  typeSpeed: 80,
  deleteSpeed: 50,
  delaySpeed: 1500,
  loop: true,
  cursor: false,
  cursorBlinking: false,
});

const data = ref<string[]>(["React", "Vue", "Angular"]);
const el = ref<HTMLElement>();

onMounted(() => {
});

const init = () => {
  if (!el.value) throw new Error("Can't initialize typewriter");

  const innerHTML = el.value.innerHTML;
  const innerText = el.value.innerText;

  el.value.innerHTML =
    innerHTML.trim() === innerText ? `<span>${innerText}</span>` : innerHTML;

  typewriter(innerHTML);

  if (props.words.length) {
    setTimeout(() => {
      startReplacing();
    }, props.delaySpeed);
  }
};

const typewriter = (str: string) => {
  return new Promise<void>((resolve) => {
    if (!el.value) throw new Error("Can't initialize typewriter");

    el.value.innerHTML = "";

    const func = (index: number) => {
      const current = str[index];
      index = current === "<" ? str.indexOf(">", 1) + 1 : index++;
      el.value.innerHTML = str.substring(0, index);

      if (index < str.length - 1) {
        setTimeout(func, props.typeSpeed, index);
        return;
      }
      resolve();
    };
    func(0);
  });
};

const removeString = (start: number, end: number) => {
  return new Promise<void>((resolve) => {
    const elCopy = el.value;
    if (!elCopy) throw new Error();

    const func = (index: number) => {
      elCopy.innerHTML = elCopy?.innerHTML.slice(0, index);
      index--;
      if (start <= index) {
        setTimeout(func, props.deleteSpeed, index);
        return;
      }
      resolve();
    };
    func(end - 1);
  });
}

const startReplacing = () => {
}

</script>

<style scoped>

</style>