<template>
  <button v-if="isVisible" class="button-left" @click="prev">
    <font-awesome-icon :icon="['fas', 'chevron-left']"/>
  </button>
  <button v-if="isVisible" class="button-right" @click="next">
    <font-awesome-icon :icon="['fas', 'chevron-right']"/>
  </button>

  <ul class="container">
    <li v-for="(item, index) in images" :key="index" ref="elements"
        class="image-item" @click="select($event, index)">
      <img :src="item.image" alt="random image"/>
    </li>

    <li :style="clonedItem" ref="clonedEl" class="cloned-item">
      <img :src="clonedItem.src" alt="cloned image">
    </li>
  </ul>
</template>

<script lang="ts" setup>
import {reactive, watch, onMounted, nextTick} from 'vue';
import useImages from "../composables/useImages";
import useRequestAnimation from "../composables/useRequestAnimation";


onMounted(() => {
  nextTick(async () => {
    await getCloneEl(clonedItem.src)
    await startAnimating(5)

    setInterval(rearrangeImages, 30000);

  })
})

const {images} = useImages();
const {clonedEl, isVisible, elements, startAnimating} = useRequestAnimation()
const clonedItem = reactive({
  minWidth: "",
  width: "",
  height: "",
  top: "",
  left: "",
  src: "",
  index: 0,
});


function rearrangeImages() {
  elements.value.forEach((item, i) => {
    const li: HTMLLIElement = elements.value[i];
    const style: CSSStyleDeclaration = window.getComputedStyle(li);
    const matrix: DOMMatrix = new WebKitCSSMatrix(style.transform);
    li.style.transform = `translateX(${0}) translateY(${matrix.m42}px)`;
  })
}

const select = async (el: Event, index: number): Promise<void> => {

  const bounds = (el.srcElement as HTMLImageElement).getBoundingClientRect();

  clonedEl.value.style.transition = "0s";
  clonedEl.value.classList.remove("active");
  clonedItem.index = index;
  clonedItem.src = (el.srcElement as HTMLImageElement).src;
  clonedItem.width = `${bounds.width}px`;
  clonedItem.height = `${bounds.height}px`;
  clonedItem.top = `${bounds.top}px`;
  clonedItem.left = `${bounds.left}px`;

  setTimeout(async () => {

    clonedEl.value.style.transition = ".5s";
    clonedItem.minWidth = `350px`;
    clonedItem.height = `270px`;

    clonedItem.left = `${window.innerWidth / 2 - (350 / 2)}px`;
    clonedItem.top = `${window.innerHeight / 2 - (270 / 2)}px`;
    clonedEl.value.classList.add("active");

    isVisible.value = true

  }, 100);
}

const getCloneEl = (src: string): void => {
  if (!src.length) {
    clonedEl.value.style.opacity = "0";
    return
  }

  clonedEl.value.style.opacity = "1";
}

const prev = (): void => {
  if (clonedItem.index === 0) {
    clonedItem.index = images.value.length - 1;
  } else {
    clonedItem.index--;
  }

  clonedItem.src = images.value[clonedItem.index].image;
}

const next = (): void => {
  if (clonedItem.index === images.value.length - 1) {
    clonedItem.index = 0;
  } else {
    clonedItem.index++;
  }

  clonedItem.src = images.value[clonedItem.index].image;
}

watch(() => clonedItem.src, (src) => {
  getCloneEl(src)
})


</script>

<style>
button.button-left {
  position: absolute;
  top: 50%;
  left: calc(50% - 200px);
  transform: translateY(-50%);
  z-index: 1;
  width: 40px;
  height: 40px;
  background-color: #1a1a1a;
  color: #f9f9f9;
}

button.button-right {
  position: absolute;
  top: 50%;
  right: calc(50% - 200px);
  transform: translateY(-50%);
  z-index: 1;
  width: 40px;
  height: 40px;
  background-color: #1a1a1a;
  color: #f9f9f9;
}


ul.container {
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  list-style-type: none;
  width: 3000px;
  position: relative; /* Add this line */
}

ul.container li {
  height: 155px;
  max-width: 380px;
}


ul.container li.image-item {
  cursor: pointer;
  transition: .4s;
  position: relative;
  transform: translateX(0) translateY(0);
}

ul.container li.image-item > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}


.cloned-item {
  position: fixed;
  transition: .5s;
  backdrop-filter: blur(2px);
}

.cloned-item > img {
  object-fit: contain;
  height: 100%;
  width: 100%;
}
</style>
