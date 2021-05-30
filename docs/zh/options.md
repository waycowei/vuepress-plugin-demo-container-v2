# 配置

## component

- 类型：`string`
- 默认值：`demo-block`

包裹代码与示例的组件名称。提供了自定义源码显示的能力。

使用本参数自定义展示示例的 **示例块** 组件，自定义的组件应当支持以下三个插槽：

- Slot `demo`：示例
- Slot `description`：示例描述
- Slot `source`：示例源码

::: warning 注意
配置的组件名称必须在 Vuepress 全局注册，可在 enhanceApp.js 中使用 `Vue.component` 进行注册。
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

设置自定义示例块组件 YourCustomDemoBlock.vue

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

- 类型：`Array`
- 默认值

<<< @/src/i18n/default_lang.json

使用 `locales` 自定义国际化配置，插件将根据 Vuepress 中匹配的 lang 字段完成语言切换，[点此查看 Vuepress 的多语言支持](https://vuepress.vuejs.org/zh/guide/i18n.html)。