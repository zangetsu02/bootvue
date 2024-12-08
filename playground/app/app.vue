<script setup lang="ts">
import { splitByCase, upperFirst } from 'scule'

const components = [
  'button'
]

const items = components.map(component => ({ label: upperName(component), to: `/components/${component}` }))

function upperName(name: string) {
  return splitByCase(name).map(p => upperFirst(p)).join('')
}
</script>

<template>
  <div class="d-flex flex-column flex-lg-row bg-body vh-100 overflow-hidden" style="background-color: var(--ui-bg);">
    <!-- Sidebar -->
    <div class="d-none d-lg-flex flex-column border-end overflow-auto w-25 p-4">
      <div class="w-100">
        <ul class="list-unstyled">
          <li v-for="(item, key) in items" :key>
            {{ item.label }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Main Content -->
    <div class="d-flex flex-column flex-grow-1 align-items-center justify-content-around overflow-auto w-100 py-5 px-4">
      <NuxtPage />
    </div>
  </div>
</template>
