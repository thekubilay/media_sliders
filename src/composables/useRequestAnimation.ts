import {ref} from "vue";
import useRunAwayActions from "./useRunAwayActions";

export default function () {
  const x = window.innerWidth / 2;
  const y = window.innerHeight / 2;
  const elements = ref<HTMLLIElement[]>([]);
  const stop = ref<boolean>(false)
  const fpsInterval = ref<number>(0)
  const then = ref<any>()
  const startTime = ref<any>()
  const now = ref<any>()
  const elapsed = ref<any>()
  const frameCount = ref<number>(0)
  const {clonedEl, isVisible, runAwayBySlide} = useRunAwayActions()


  const startAnimating = (fps: number): void => {
    fpsInterval.value = 1000 / fps;
    then.value = Date.now();
    startTime.value = then.value;
    animate();
  }

  const animate = (): void => {

    if (stop.value) {
      return;
    }

    // request another frame

    requestAnimationFrame(animate);

    // calc elapsed time since last loop

    now.value = Date.now();
    elapsed.value = now.value - then.value;

    // if enough time has elapsed, draw the next frame

    if (elapsed.value > fpsInterval.value) {

      // Get ready for next frame by setting then=now, but...
      // Also, adjust for fpsInterval not being multiple of 16.67
      then.value = now.value - (elapsed.value % fpsInterval.value);

      // actions below
      runAwayBySlide(elements.value, x, y)


      // TESTING...Report #seconds since start and achieved fps.
      // const sinceStart = now.value - startTime.value;
      // const currentFps = Math.round(1000 / (sinceStart / ++frameCount.value) * 100)
      // console.log("Elapsed time= " + Math.round(sinceStart / 1000 * 100) / 100 + " secs @ " + currentFps + " fps.")
    }
  }

  return {
    clonedEl,
    isVisible,
    elements,
    x, y,
    stop,
    startAnimating
  }
}