# 简介

**这是一个 VuePress 1.x(Vue 2.x) 插件，如果你需要 Vue 3.x 支持，请查看 [vuepress-plugin-demo-container-v3](https://github.com/wkcole/vuepress-plugin-demo-container-v3)**

`Demo Container V2` 是一个基于 `Vuepress` 的插件，它可以为你提供简单便利的组件示例编写体验。

它可以帮你做到：
1. 使用自定义 `::: demo` 语法，写一遍示例即可自动生成组件示例与代码示例；
2. 支持示例中的 `import` 语法；

# 安装
使用 `yarn`:
```bash
yarn add vuepress-plugin-demo-container-v2 -D
```
或者 `npm`:
```bash
npm i vuepress-plugin-demo-container-v2 -D
```

# 使用
打开 `.vuepress/config.js` 文件, 添加插件:

```js
module.exports = {
  plugins: ['demo-container-v2']
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
<!-- 忽略上一行的空格 -->
:::
```

[点此查看完整文档](https://waycowei.github.io/vuepress-plugin-demo-container-v2/zh/)

# 致谢
该项目是受到 ElementUI / [md-loader](https://github.com/element-plus/element-plus/tree/dev/website/md-loader) 的启发而生，向 **饿了么大前端** 致意。

# 贡献者
<p>
  <a href="https://github.com/calebman" target="_blank">
    <img src="https://avatars0.githubusercontent.com/u/27751088" width="54px" height="54px" style="border-radius: 50%;" title="JianhuiChen" class="avatar-user avatar">
  </a>
  <a href="https://github.com/waycowei" target="_blank">
    <img src="https://avatars0.githubusercontent.com/u/8675871" width="54px" height="54px" style="border-radius: 50%;" title="WaycoWei" class="avatar-user avatar">
  </a>
</p>

# 许可

[MIT License](https://github.com/waycowei/vuepress-plugin-demo-container-v2/blob/master/LICENSE) @2020-PRESENT [Wayco Wei](https://github.com/waycowei)
