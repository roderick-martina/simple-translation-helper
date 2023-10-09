<script setup lang='ts'>
import {useStorage} from "@vueuse/core"
import {computed, ref, useSlots} from "vue"

type Positions = "top-left" | "top-right" | "bottom-left" | "bottom-right"
const props = defineProps({
  active: {
    type: Boolean,
    default: false,
  },
  position: {
    type: String,
    validator(value: Positions) {
      return ["top-left", "top-right", "bottom-left", "bottom-right"].includes(value)
    },
    default: "bottom-right",
  },
  activeBackgroundColor: {
    type: String,
    default: "#0891b2",
  },
})

const position = ref(props.position)

switch (position.value) {
  case "top-left":
    position.value = "sth-top-8 sth-left-8"
    break
  case "top-right":
    position.value = "sth-top-8 sth-right-8"
    break
  case "bottom-left":
    position.value = "sth-bottom-8 sth-left-8"
    break
  case "bottom-right":
    position.value = "sth-bottom-8 sth-right-8"
    break
}

const slots = useSlots()
const hasSlot = computed(() => !!slots.button)

const showKeys = useStorage("show-translation-keys", false)

const hideTranslationKeys = () => {
  showKeys.value = false
}

const showTranslationKeys = () => {
  showKeys.value = true
}

if (!props.active) {
  showKeys.value = false
}
</script>

<template>
  <div class="sth-fixed" :class="position">
    <slot v-if="hasSlot" name="button" :hideTranslationKeys="hideTranslationKeys"
          :showTranslationKeys="showTranslationKeys" :active="showKeys"/>
    <div v-else class="sth-flex sth-flex-col sth-items-center">
      <div class="sth-isolate sth-flex sth-divide-x sth-divide-gray-200 sth-rounded-lg sth-shadow">
        <button
            class="hub-button-container sth-text-gray-900 sth-rounded-l-lg sth-group sth-relative sth-min-w-0 sth-flex-1 sth-overflow-hidden sth-py-4 sth-px-4 sth-text-center sth-text-sm sth-font-bold sth-focus:z-10"
            :class="showKeys ? '' : 'sth-text-white'"
            :style="{ backgroundColor: showKeys ? '#fff' : activeBackgroundColor }"
            @click="hideTranslationKeys"
        >
          OFF
        </button>
        <button
            class="hub-button-container sth-rounded-r-lg sth-group sth-relative sth-min-w-0 sth-flex-1 sth-overflow-hidden sth-py-4 sth-px-4 sth-text-center sth-text-sm sth-font-bold sth-focus:z-10"
            :class="showKeys ? 'sth-text-white' : ''"
            :style="{ backgroundColor: showKeys ? activeBackgroundColor : '#fff' }"
            @click="showTranslationKeys"
        >
          ON
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

.hub-button-container {
  box-sizing: border-box;
  border: 0 solid #e5e7eb;
}


</style>