# 简介

`Demo Container` 是一个基于 `Vuepress` 的插件，它可以帮助你在编写文档的时候增加 `Vue` 示例，它的诞生初衷是为了降低编写组件文档时增加一些相关示例的难度。

使用 Vuepress 编写组件示例有以下尴尬之处：
1. 组件示例和示例代码本质上一样，却需要写两遍；
2. Vuepress 无法渲染 Markdown 中的 `export default {}` 代码块；

Demo Container 参考了 Element UI 的文档渲染，实现了和它一样的，可在 Markdown 中直接编写示例的语法。
* Element UI ColorPicker 组件的**文档编写示例**，[点此查看](https://github.com/ElemeFE/element/blob/dev/examples/docs/zh-CN/color-picker.md)
* Element UI ColorPicker 组件的**文档示例预览**，[点此查看](https://element.eleme.cn/2.0/#/zh-CN/component/color-picker)

[点此查看示例与使用文档](https://wkcole.github.io/vuepress-plugin-demo-container-v2/zh/)

# 使用
打开 .vuepress/config.js 文件, 添加插件:

```js
module.exports = {
  ...
  plugins: ['demo-container-v2']
  ...
}
```

在 md 文件中可以按照以下格式书写代码示例:

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

# 安装
使用 `yarn`:
```bash
yarn add vuepress-plugin-demo-container-v2 -D
```
或者 `npm`:
```bash
npm i vuepress-plugin-demo-container-v2 -D
```

# 致谢
This project is heavily inspired by the [md-loader](https://github.com/element-plus/element-plus/tree/dev/website/md-loader) of ElementUI.

# 贡献者
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

# 许可

[MIT License](https://github.com/wkcole/vuepress-plugin-demo-container-v2/blob/master/LICENSE) @2020-现在 [Wayco Wei](https://github.com/wkcole)
