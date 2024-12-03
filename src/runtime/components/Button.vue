<template>
  <component
    :is="computedTag"
    class="btn"
    :class="computedClasses"
    :aria-disabled="nonStandardTag ? disabledBoolean : null"
    :aria-pressed="isToggle ? pressedBoolean : null"
    :autocomplete="isToggle ? 'off' : null"
    :disabled="isButton ? disabledBoolean : null"
    :href="href"
    :rel="computedLink ? rel : null"
    :role="nonStandardTag || computedLink ? 'button' : null"
    :target="computedLink ? target : null"
    :type="isButton ? type : null"
    :to="!isButton ? to : null"
    :append="computedLink ? append : null"
    :active-class="isBLink ? activeClass : null"
    :event="isBLink ? event : null"
    :replace="isBLink ? replace : null"
    :router-component-name="isBLink ? routerComponentName : null"
    :router-tag="isBLink ? routerTag : null"
    @click="clicked"
  >
    <template v-if="loadingBoolean">
      <slot name="loading">
        <template v-if="!loadingFillBoolean">
          {{ loadingText }}
        </template>
        <slot name="loading-spinner">
          <BSpinner :small="size !== 'lg'" :label="loadingFillBoolean ? loadingText : undefined" />
        </slot>
      </slot>
    </template>
    <template v-else>
      <slot />
    </template>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useVModel } from '@vueuse/core'

defineSlots<{
  'default'?: (props: Record<string, never>) => any
  'loading'?: (props: Record<string, never>) => any
  'loading-spinner'?: (props: Record<string, never>) => any
}>()

const props = withDefaults(
  defineProps<
    {
      disabled?: boolean
      active?: boolean
      pill?: boolean
      pressed?: boolean
      size?: string
      squared?: boolean
      tag?: string
      type?: string
      variant?: string | null
      loading?: boolean
      loadingFill?: boolean
      block?: boolean
      loadingText?: string
      href?: string
      to?: string
    }
  >(),
  {
    pill: false,
    pressed: undefined,
    size: 'md',
    squared: false,
    tag: 'button',
    type: 'button',
    variant: 'secondary',
    loading: false,
    loadingFill: false,
    block: false,
    loadingText: 'Loading...',
    // Link props
    active: false,
    activeClass: undefined,
    append: false,
    disabled: false,
    event: 'click',
    href: undefined,
    // noPrefetch: {type: [Boolean, String] as PropType<boolean>, default: false},
    // prefetch: {type: [Boolean, String] as PropType<boolean>, default: null},
    rel: undefined,
    replace: false,
    routerComponentName: 'router-link',
    routerTag: 'a',
    target: '_self',
    to: undefined,
    opacity: undefined,
    opacityHover: undefined,
    underlineVariant: null,
    underlineOffset: undefined,
    underlineOffsetHover: undefined,
    underlineOpacity: undefined,
    underlineOpacityHover: undefined,
    icon: false
  }
)

const emit = defineEmits<{
  'click': [value: MouseEvent]
  'update:pressed': [value: boolean]
}>()

const pressedValue = useVModel(props, 'pressed', emit)

const activeBoolean = props.active
const blockBoolean = props.block
const disabledBoolean = props.disabled
const pillBoolean = props.pill
const pressedBoolean = props.pressed
const squaredBoolean = props.squared
const loadingBoolean = props.loading
const loadingFillBoolean = props.loadingFill

const isToggle = computed(() => typeof pressedBoolean === 'boolean')

const isButton = computed(
  () => props.tag === 'button' && props.href === undefined && props.to === undefined
)

const isBLink = computed(() => props.to !== undefined)
const nonStandardTag = computed(() => (props.href !== undefined ? false : !isButton.value))

const computedClasses = computed(() => [
  [`btn-${props.size}`],
  {
    [`btn-${props.variant}`]: props.variant !== null,
    'btn-block': blockBoolean,
    'active': activeBoolean || pressedBoolean,
    'rounded-pill': pillBoolean,
    'rounded-0': squaredBoolean,
    'disabled': disabledBoolean
  }
])

const computedTag = computed(() => (isBLink.value ? null : props.href ? 'a' : props.tag))

const clicked = (e: MouseEvent): void => {
  if (disabledBoolean) {
    e.preventDefault()
    e.stopPropagation()
    return
  }
  emit('click', e)
  if (isToggle.value) {
    pressedValue.value = !pressedBoolean
  }
}
</script>
