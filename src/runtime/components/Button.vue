<template>
  <component
    :is="tag"
    class="btn"
    :class="computedClasses"
    @click="onClick"
  >
    <template v-if="loading">
      <slot name="loading">
        {{ loadingText }}
        <slot name="loading-spinner" />
      </slot>
    </template>
    <template v-else>
      <slot />
    </template>
  </component>
</template>

<script setup lang="ts">
import type { ButtonVariant, Size } from '~/src/runtime/types/utils'

// TODO: extends LinkProps
export interface ButtonProps {
  pill?: boolean
  squared?: boolean
  type?: ButtonVariant
  loading?: boolean
  block?: boolean
  active?: boolean
  close?: boolean
  disabled?: boolean
  size?: Size
  tag?: string
  loadingText?: string
}

const props = withDefaults(defineProps<ButtonProps>(), {
  pill: false,
  squared: false,
  type: 'secondary',
  loading: false,
  block: false,
  active: false,
  close: false,
  disabled: false,
  size: 'md',
  tag: 'button'
})

const emit = defineEmits<{
  click: [value: MouseEvent]
}>()

const computedClasses = computed(() => [
  [`btn-${props.size}`],
  {
    [`btn-${props.type}`]: props.type !== null,
    'btn-block': props.block,
    'active': props.active,
    'rounded-pill': props.pill,
    'rounded-0': props.squared,
    'disabled': props.disabled
  }
])

function onClick(e: MouseEvent): void {
  if (props.disabled) {
    e.preventDefault()
    e.stopPropagation()
    return
  }
  emit('click', e)
}
</script>
