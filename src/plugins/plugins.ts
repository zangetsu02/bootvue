import { join } from 'pathe'
import { globSync } from 'tinyglobby'
import { genSafeVariableName } from 'knitwork'
import MagicString from 'magic-string'

import { runtimeDir, type BootVueOptions } from '../unplugin'

import type { UnpluginOptions } from 'unplugin'

/**
 * This plugin provides the necessary transforms to allow loading the
 * plugins in `src/runtime/plugins/` in a pure Vue environment.
 */
export default function PluginsPlugin(_options: BootVueOptions) {
  const plugins = globSync(['**/*', '!*.d.ts'], { cwd: join(runtimeDir, 'plugins'), absolute: true })

  return {
    name: 'bootvue:plugins',
    enforce: 'pre',
    resolveId(id) {
      if (id === 'bootvue/vue-plugin') {
        return 'virtual:bootvue-plugins'
      }
    },
    transform(code, id) {
      if (plugins.some(p => id.startsWith(p)) && code.includes('import.meta.client')) {
        const s = new MagicString(code)
        s.replaceAll('import.meta.client', 'true')

        if (s.hasChanged()) {
          return {
            code: s.toString(),
            map: s.generateMap({ hires: true })
          }
        }
      }
    },
    loadInclude: id => id === 'virtual:bootvue-plugins',
    load() {
      return `
        ${plugins.map(p => `import ${genSafeVariableName(p)} from "${p}"`).join('\n')}
export default {
  install (app) {
${plugins.map(p => `    app.use(${genSafeVariableName(p)})`).join('\n')}
  }
}
        `
    }
  } satisfies UnpluginOptions
}
