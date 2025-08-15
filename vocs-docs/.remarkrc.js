import remarkPresetLintRecommended from 'remark-preset-lint-recommended'
import remarkLintNoShortcutReferenceLink from 'remark-lint-no-shortcut-reference-link'

export default {
  plugins: [
    remarkPresetLintRecommended,
    [remarkLintNoShortcutReferenceLink, false]
  ]
}
