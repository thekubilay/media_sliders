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
import {ref, reactive, watch, onMounted, nextTick} from 'vue';
import useImages from "../composables/useImages";

onMounted(() => {
  nextTick(async () => {
    await isElementCloned(clonedItem.src)
    await slideElementsFromRightToLeft()
  })
})

const {images} = useImages();

const x = window.innerWidth / 2;
const y = window.innerHeight / 2;
const elements = ref<HTMLLIElement[]>([]);
const clonedEl = ref<HTMLLIElement>({} as HTMLLIElement);
const clonedItem = reactive({
  minWidth: "",
  width: "",
  height: "",
  top: "",
  left: "",
  src: "",
  index: 0,
});


const isVisible = ref<boolean>(false)

const slideElementsFromRightToLeft = () => {
  setInterval(() => {
    for (let i = 0; i < elements.value.length; i++) {
      const li = elements.value[i];
      const style = window.getComputedStyle(li);
      const matrix = new WebKitCSSMatrix(style.transform);

      if (isVisible.value) {
        const rect = li.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);

        if (distance > 250) {
          li.style.transform = `translateX(${matrix.m41 - 3}px) translateY(${matrix.m42}px)`;
        } else if (distance > 0) {
          elements.value[i].setAttribute("offsetLeftDistance", `${elements.value[i].offsetLeft}`);

          const dx = (centerX - x + matrix.m41) * 250 / distance;
          const dy = (centerY - y) * 250 / distance;

          if (dy > 100) {
            li.style.transform = `translateX(${dx - 300}px) translateY(${dy}px)`;
          } else {
            li.style.transform = `translateX(${dx - 300}px) translateY(${dy - 200}px)`;
          }
        }

        // Check if the element has passed the cloned element by around 300px
        const clonedRect = clonedEl.value.getBoundingClientRect();

        if (centerX < clonedRect.left - 120) {
          li.style.transform = `translateX(${matrix.m41 - 3}px) translateY(0)`;
        }

      } else {
        li.style.transform = `translateX(${matrix.m41 - 3}px) translateY(${matrix.m42}px)`;
      }
    }
  }, 100);
};


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
    clonedItem.minWidth = `300px`;
    clonedItem.height = `250px`;

    clonedItem.left = `${window.innerWidth / 2 - (300 / 2)}px`;
    clonedItem.top = `${window.innerHeight / 2 - (250 / 2)}px`;
    clonedEl.value.classList.add("active");

    await runAwayBySelect()

    isVisible.value = true

  }, 100);
};

const runAwayBySelect = () => {
  if (isVisible.value) return;

  for (let i = 0; i < elements.value.length; i++) {
    const li = elements.value[i];
    const rect = li.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);

    if (distance > 250) {
      li.style.transform = 'none';
    } else if (distance > 0) {
      const dx = (centerX - x) * 250 / distance; // Calculate the horizontal distance
      const dy = (centerY - y) * 250 / distance; // Calculate the vertical distance

      li.style.transform = `translateX(${dx}px) translateY(${dy}px)`;


    } else {
      li.style.transform = 'none';
    }
  }
};

const isElementCloned = (src: string): void => {
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

watch(() => clonedItem.src, src => {
  isElementCloned(src)
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
  width: 1700px;
  position: relative; /* Add this line */
}

ul.container li {
  height: 200px;
  max-width: 380px;
}


ul.container li.image-item {

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
