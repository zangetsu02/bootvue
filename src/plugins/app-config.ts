import type { UnpluginOptions } from 'unplugin'

import type { BootVueOptions } from '../unplugin'

/**
 * This plugin injects BootVue configuration into the runtime build so BootVue components can
 * access it.
 */
export default function AppConfigPlugin(options: BootVueOptions, appConfig: Record<string, any>) {
  return {
    name: 'bootvue:app-config',
    enforce: 'pre',
    resolveId(id) {
      if (id === '#build/app.config') {
        return 'virtual:nuxt-ui-app-config'
      }
    },
    loadInclude: id => id === 'virtual:nuxt-ui-app-config',
    load() {
      return `
          export default ${JSON.stringify(appConfig)}
        `
    }
  } satisfies UnpluginOptions
}
