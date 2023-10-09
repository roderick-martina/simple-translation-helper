<script setup lang='ts'>
import { computed, ref, useSlots } from "vue"
import { useClipboard, useStorage } from "@vueuse/core"
import {Menu as VMenu} from "floating-vue"

const props = defineProps({
  translationKey: {
    type: String,
    required: true,
  },
  translation: {
    type: String,
    default: null,
  },
})

const slots  = useSlots()

const hasSlot = computed(() => !!slots)

const translationIsEmptyOrEqualToKey = computed(() => {
  return props.translation === null || props.translation === props.translationKey
})

const tmpContent = ref('')

const content = computed(() => {
  if (!hasSlot.value) {
    return !props.translation ? props.translationKey : props.translation
  } else if (slots !== undefined && translationIsEmptyOrEqualToKey.value) {
    return slots?.default?.()[0]?.children ?? null;
  } else {
    return props.translation
  }
})

const showKeys = computed(() => useStorage("show-translation-keys", false))

const { copy } = useClipboard({
  source: props.translationKey,
  legacy: true,
})

const handleCopy = () => {
  tmpContent.value = 'Copied!'
  copy()
  setTimeout(() => {
    tmpContent.value = ''
  }, 1000)
}

const translationKeyOrCopiedText = computed(() => {
  if (tmpContent.value !== '') {
    return tmpContent.value
  }
  return props.translationKey
})
</script>
<template>
  <v-menu v-if="showKeys.value">
    <span>{{ content }}</span>

    <template #popper>
      <button class="sth-p-3" @click="handleCopy">
        {{ translationKeyOrCopiedText }}
      </button>
    </template>
  </v-menu>
  <template v-else>{{ content }}</template>
  <!--    <span v-if="showKeys.value">{{ props.translationKey }}</span>-->
  <!--    <template v-else>{{ content }}</template>-->
</template>

<style scoped></style>