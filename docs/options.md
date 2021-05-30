# Options

## component

- Type: `string`
- Default: `demo-block`

The component name of the warp code and example.

Use this parameter to customize the **demo block** component inside the Demo Container V2. The customized component should support the following three slots:

- Slot `demo`: Is rendered as an example
- Slot `description`: Is rendered as example description information
- Slot `source`: Source code rendered as an example

::: warning
The configured component name must be registered globally in Vuepress, which can be registered using `Vue.component` in enhanceApp.js.
:::

```js
module.exports = {
  plugins: {
    'demo-container-v2': {
      component: 'YourCustomDemoBlock'
    }
  }
}
```

Set custom sample block component YourCustomDemoBlock.vue.

```html
<template>
  <div>
    <h3>Description</h3>
    <slot name="description"></slot>
    <h3>Example</h3>
    <slot name="demo"></slot>
    <h3>Source Code</h3>
    <slot name="source"></slot>
  </div>
</template>
```

## locales

- Type: `Array`
- Default

<<< @/src/i18n/default_lang.json

Use `locales` to customize the internationalization configuration, and the plugin will complete the language switching according to the [matching lang field in Vuepress](https://vuepress.vuejs.org/guide/i18n.html).