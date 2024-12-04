import { fileURLToPath } from 'node:url'

import { join } from 'pathe'
import { createUnplugin } from 'unplugin'
import AutoImport from 'unplugin-auto-import'

import ComponentImportPlugin from './plugins/components'
import NuxtEnvironmentPlugin from './plugins/nuxt-environment'
import PluginsPlugin from './plugins/plugins'

export const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))

type AppConfig = Record<string, any>

export interface BootVueOptions {
  /** Whether to generate declaration files for auto-imported components. */
  dts?: boolean
  bootvue?: AppConfig
}

export const BootVuePlugin = createUnplugin<BootVueOptions>((options, meta) => {
  return [
    NuxtEnvironmentPlugin(),
    ...ComponentImportPlugin(meta.framework, options),
    AutoImport[meta.framework]({ dts: options.dts ?? true, dirs: [join(runtimeDir, 'composables')] }),
    PluginsPlugin(options)
  ]
})
