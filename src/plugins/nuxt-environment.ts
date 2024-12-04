import type { UnpluginOptions } from 'unplugin'
import { join, normalize } from 'pathe'
import MagicString from 'magic-string'
import { resolvePathSync } from 'mlly'

import { runtimeDir } from '../unplugin'

/**
 * This plugin normalises Nuxt environment (#imports) and `import.meta.client` within the Nuxt UI components.
 */
export default function NuxtEnvironmentPlugin() {
  const stubPath = resolvePathSync(join(runtimeDir, 'vue/stubs'), { extensions: ['.ts', '.mjs', '.js'] })

  return {
    name: 'bootvue',
    enforce: 'pre',
    resolveId(id) {
      if (id === '#imports') {
        return join(stubPath, 'index.ts')
      }
    },
    transformInclude(id) {
      return normalize(id).includes(runtimeDir)
    },
    transform(code) {
      if (code.includes('import.meta.client')) {
        const s = new MagicString(code)
        s.replaceAll('import.meta.client', 'true')

        if (s.hasChanged()) {
          return {
            code: s.toString(),
            map: s.generateMap({ hires: true })
          }
        }
      }
    }
  } satisfies UnpluginOptions
}
