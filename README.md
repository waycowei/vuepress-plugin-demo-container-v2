# Introduction

[点此查看中文简介](https://github.com/wkcole/vuepress-plugin-demo-container-v2/blob/master/README.zh-CN.md)

`Demo Container` is a `Vuepress-based` plug-in, which can help you add `Vue` examples when writing documents. Its original intention is to reduce the difficulty of adding some related examples when writing component documents.

Using Vuepress to write component examples has the following embarrassment:
1. Component examples and sample code are essentially the same, but need to be written twice;
2. Vuepress cannot render the `export default {}` code block in Markdown;

The Demo Container refers to Element UI's document rendering and implements the same syntax as it can be used to write sample syntax directly in Markdown.
* Element UI ColorPicker component **documentation example**, [click here to view](https://github.com/ElemeFE/element/blob/dev/examples/docs/en-US/color-picker.md)
* Element UI ColorPicker component **document sample preview**, [click here to view](https://element.eleme.cn/2.0/#/en-US/component/color-picker)。

[Click here for examples and documentation](https://wkcole.github.io/vuepress-plugin-demo-container-v2/)

# Usage
Open the .vuepress/config.js file, and then reference the plugin in the appropriate location:

```js
module.exports = {
  ...
  plugins: ['demo-container-v2']
  ...
}
```

Write the following code in the Markdown file:

```html
::: demo
```vue
<template>
  <div>
    <p>{{ message }}</p>
    <input v-model="message" placeholder="Input something..."/>
  </div>
</template>
<script>
  import { ref } from '@vue/composition-api'
  export default {
    setup () {
      const message = ref('Hello Here')

      return {
        message
      }
    }
  }
</script>
\``` <= ignore the \
:::
```

# Install
Use `yarn`:
```bash
yarn add vuepress-plugin-demo-container-v2 -D
```
Or `npm`:
```bash
npm i vuepress-plugin-demo-container-v2 -D
```

# Thanks
This project is heavily inspired by the [md-loader](https://github.com/element-plus/element-plus/tree/dev/website/md-loader) of ElementUI.

# Contributors
<p>
  <a-tooltip title="JianhuiChen">
    <a href="https://github.com/calebman" target="_blank">
      <a-avatar src="https://avatars0.githubusercontent.com/u/27751088" :size="54"/>
    </a>
  </a-tooltip>
  <a-tooltip title="WaycoWei">
    <a href="https://github.com/wkcole" target="_blank">
      <a-avatar src="https://avatars.githubusercontent.com/u/8675871" :size="54"/>
    </a>
  </a-tooltip>
</p>

# License

[MIT License](https://github.com/wkcole/vuepress-plugin-demo-container-v2/blob/master/LICENSE) @2020-PRESENT [Wayco Wei](https://github.com/wkcole)
