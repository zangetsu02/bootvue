import { addComponentsDir, addImportsDir, createResolver, defineNuxtModule } from '@nuxt/kit'

export interface ModuleOptions {
  prefix: string | undefined
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'bootvue',
    configKey: 'bootvue'
  },
  defaults: {
    prefix: 'B'
  },
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    nuxt.options.alias['#boovue'] = resolve('./runtime')

    addComponentsDir({
      path: resolve('./runtime/components'),
      prefix: options.prefix,
      pathPrefix: false
    })

    addImportsDir(resolve('./runtime/composables'))
  }
})
