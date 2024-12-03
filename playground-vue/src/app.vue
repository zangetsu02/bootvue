<script setup lang="ts">
import { useRouter } from 'vue-router'
import { reactive, ref } from 'vue'
import { useColorMode } from '@vueuse/core'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore included for compatibility with Nuxt playground

const mode = useColorMode()

const router = useRouter()

const components = [
  'accordion',
  'alert',
  'avatar',
  'badge',
  'breadcrumb',
  'button',
  'button-group',
  'card',
  'carousel',
  'checkbox',
  'chip',
  'collapsible',
  'context-menu',
  'command-palette',
  'drawer',
  'dropdown-menu',
  'form',
  'form-field',
  'input',
  'input-menu',
  'kbd',
  'link',
  'modal',
  'navigation-menu',
  'pagination',
  'pin-input',
  'popover',
  'progress',
  'radio-group',
  'select',
  'select-menu',
  'separator',
  'shortcuts',
  'skeleton',
  'slideover',
  'slider',
  'switch',
  'tabs',
  'textarea',
  'toast',
  'tooltip'
]

const items = components.map(component => ({ label: upperName(component), to: `/components/${component}` }))

function upperName(name: string) {
  return name
}

const isCommandPaletteOpen = ref(false)

function onSelect(item: any) {
  router.push(item.to)
}

</script>

<template>

        <Suspense>
          <RouterView />
        </Suspense>
   
</template>
