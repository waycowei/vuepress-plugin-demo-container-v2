# 快速上手

## 安装

### 安装 VuePress

请参考 Vuepress 官方文档，[点此查看](https://vuepress.vuejs.org/zh/guide/)

### 安装插件

使用 `yarn` 安装 `vuepress-plugin-demo-container-v2` 组件：
```bash
yarn add vuepress-plugin-demo-container-v2 -D
```
或者使用 `npm` 安装它：
```bash
npm i vuepress-plugin-demo-container-v2 --save-dev
```
如果你的网络环境不佳，推荐使用 [cnpm](https://github.com/cnpm/cnpm)。

### 配置插件

打开 `.vuepress/config.js` 文件，然后在合适的位置引用插件：

```js
module.exports = {
  plugins: ['demo-container-v2']
}
```

如果你对 VuePress 插件配置不是很了解，请点这里：[使用插件](https://vuepress.vuejs.org/zh/plugin/using-a-plugin.html)

配置完毕后，启动 VuePress

## 使用

::: warning 注意
为了展示如何编写示例, 用于标记代码部分结束的三点增加了空格分隔，使用时需要将空格去除。
:::

在 Markdown 文件中编写以下代码：

```html
::: demo 此处放置代码示例的描述信息，支持 `Markdown` 语法，**描述信息只支持单行**
```html
<template>
  <div>
    <p>{{ message }}</p>
    <AInput v-model="message" placeholder="Input something..." />
  </div>
</template>
<script>
  import { ref } from 'vue-demi'
  export default {
    setup () {
      const message = ref('Hello Here')

      return {
        message
      }
    }
  }
</script>
` ``
:::
```

运行效果如下

::: demo 此处放置代码示例的描述信息，支持 `Markdown` 语法，**描述信息只支持单行**
```html
<template>
  <div>
    <p>{{ message }}</p>
    <AInput v-model="message" placeholder="Input something..." />
  </div>
</template>
<script>
  import { ref } from 'vue-demi'
  export default {
    setup () {
      const message = ref('Hello Here')

      return {
        message
      }
    }
  }
</script>
```
:::