module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'script',
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#bulb-rules
    'plugin:vue/recommended',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard',
    // https://github.com/prettier/eslint-config-prettier
    'prettier',
    'prettier/standard',
  ],
  rules: {
    // Only allow debugger in development
    'no-debugger': process.env.PRE_COMMIT ? 'error' : 'off',
    // Only allow `console.log` in development
    'no-console': process.env.PRE_COMMIT
      ? ['error', {allow: ['warn', 'error']}]
      : 'off',
    'vue/component-name-in-template-casing': [
      'error',
      'kebab-case',
      {
        ignores: [
          'component',
          'template',
          'transition',
          'transition-group',
          'keep-alive',
          'slot',
          'router-view',
          'router-link',
        ],
      },
    ],
    'vue/multiline-html-element-content-newline': 'error',
    'vue/html-closing-bracket-spacing': 'never',
    'vue/singleline-html-element-content-newline': 'never',
    'vue/no-spaces-around-equal-signs-in-attribute': 'never',
    'vue/html-self-closing': 'never',
    'vue/script-indent': ['off', null, {baseIndent: 0}],
    'vue/attribute-hyphenation': ['error', 'never'],
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 5,
        multiline: {
          max: 5,
          'allowFirstLine': true
        }
      }
    ],
  },
  overrides: [
    {
      files: ['src/**/*', 'tests/unit/**/*', 'tests/e2e/**/*'],
      excludedFiles: 'app.config.js',
      parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module',
      },
      env: {
        browser: true,
      },
    },
    {
      files: ['**/*.unit.js'],
      parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module',
      },
      env: {jest: true},
      globals: {
        mount: false,
        shallowMount: false,
        shallowMountView: false,
        createComponentMocks: false,
        createModuleStore: false,
      },
    },
  ],
}
