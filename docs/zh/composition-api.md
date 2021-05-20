# 组合式 API 文档示例

现在插件已支持导入 `vue` 或者 `@vue/composition-api` 了。

::: demo
```vue
<template>
  <div>
    counter is: {{ counter }}<br>
    <AButton @click="add">Add</AButton>
    <AButton @click="reset">Reset</AButton>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api'
export default {
  setup () {
    const counter = ref(0)
    function add () {
      counter.value++
    }
    function reset () {
      counter.value = 0
    }

    return {
      counter,
      add,
      reset
    }
  }
}
</script>
```
:::