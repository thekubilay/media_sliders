import {ref} from "vue";

export default function useRunAwayActions() {
  const isVisible = ref<boolean>(false)
  const clonedEl = ref<HTMLLIElement>({} as HTMLLIElement);

  const runAwayBySelect = async (
    cloneEl: HTMLLIElement,
    elements: HTMLLIElement[],
    x: number,
    y: number
  ): Promise<void> => {
    if (isVisible.value) return;

    for (let i = 0; i < elements.length; i++) {
      const li = elements[i];

      const rect = li.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);

      if (distance > 0 && distance < 200) {
        const dx: number = (centerX - x) * 195 / distance; // Calculate the horizontal distance
        const dy: number = (centerY - y) * 110 / distance; // Calculate the vertical distance

        li.style.transform = `translateX(${dx}px) translateY(${dy}px)`;

      } else {
        const bounds = li.getBoundingClientRect();
        const width = bounds.width;
        const height = bounds.height;

        // Use the width and height of the other elements here as needed
      }
    }
  };

  const runAwayBySlide = (elements: HTMLLIElement[], x: number, y: number): void => {
    for (let i: number = 0; i < elements.length; i++) {
      const li: HTMLLIElement = elements[i];
      const style: CSSStyleDeclaration = window.getComputedStyle(li);
      const matrix: DOMMatrix = new WebKitCSSMatrix(style.transform);


      if (isVisible.value) {

        if (!li.getAttribute("data-basePosY")) {
          li.setAttribute("data-basePosY", String(li.offsetTop));
          li.getAttribute("data-basePosY")
        }

        const rect: DOMRect = li.getBoundingClientRect();
        const centerX: number = rect.left + rect.width / 2;
        const centerY: number = rect.top + rect.height / 2;
        const distance: number = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
        const closerTo: string = centerY < y ? "top" : "bottom"

        if (Math.abs(distance) > 250) {
          // elements move left only
          li.style.transform = `translateX(${matrix.m41 - 3}px) translateY(${0}px)`;

        } else if (distance > 0 && distance < 250) {
          // elements move left and up/down

          if (closerTo === "top") {
            // move up and left
            li.style.transform = `translateX(${matrix.m41 - 35}px) translateY(${matrix.m42 - 20}px)`;
          } else {
            // move down and left
            li.style.transform = `translateX(${matrix.m41 - 35}px) translateY(${matrix.m42 + 20}px)`;
          }
        }

      } else {
        // Check if element passed the clone and moved over 230px from the clone


        // Element is not visible, move left only
        li.style.transform = `translateX(${matrix.m41 - 3}px) translateY(${matrix.m42}px)`;
      }
    }
  };


  return {
    clonedEl,
    isVisible,
    runAwayBySelect,
    runAwayBySlide
  }
}