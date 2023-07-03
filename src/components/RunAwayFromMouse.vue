<template>

  <div class="cursor" :style="{top: (y-36) + 'px', left: (x-36) + 'px'}">
    <font-awesome-icon :icon="['fasl', 'hand-point-up']"/>
    <span>click</span>
  </div>

  <ul class="container">
    <li v-for="(item, index) in images" :key="index" ref="imageItems" class="image-item"
        :style="runAway(index, item.width)">
      <img :src="item.image" alt="Random Image"/>
    </li>
  </ul>

</template>

<script lang="ts" setup>
import {ref} from 'vue';
import useImages from "../composables/useImages";
import {useMouse} from '@vueuse/core';

const {images} = useImages();
const {x, y} = useMouse();

const imageItems = ref<HTMLLIElement[]>([]);
const visible = ref<boolean>(false)

const runAway = (index: number, width: string) => {

  const li: HTMLLIElement = imageItems.value[index];

  if (!li) {
    return 'none'; // Return default transformation if li is undefined
  }

  const rect = li.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const distance = Math.sqrt((x.value - centerX) ** 2 + (y.value - centerY) ** 2);

  if (distance > 200) {
    return {transform: 'none', width: width};
  } else if (distance > 5) {
    const dx = (centerX - x.value) * 200 / distance; // Calculate the horizontal distance
    const dy = (centerY - y.value) * 200 / distance; // Calculate the vertical distance
    return {transform: `translate(${dx}px, ${dy}px)`, width: width};
  } else {
    return {transform: 'none', width: width};
  }
};
</script>
<style>


ul.container {
  overflow: hidden;
  position: fixed;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 0;
  list-style-type: none;
}

ul.container li.image-item {
  height: 99.3px;
  position: relative;
  transition: transform 0.5s;
}

ul.container li.image-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>