# 介绍

`Demo Container V2` 是一个基于 `Vuepress` 的插件，它可以帮助你在编写文档的时候增加 `Vue` 示例，它的诞生初衷是为了降低编写组件文档时增加一些相关示例的难度。

## 如何工作

Demo Container V2 使用 Vuepress 的 [chainMarkdown、extendMarkdown API](https://vuepress.vuejs.org/zh/plugin/option-api.html#extendmarkdown) 拓展了其内部的 markdown 对象，并做了以下操作：

1. 基于 [markdown-it-container](https://github.com/markdown-it/markdown-it-container) 构建了一个识别以下代码块的插件
```
:::demo xxx
xxx
:::
```
为其包裹 `<demo-block></demo-block>` 组件，拾取示例代码并缓存下来。至此，已完成示例代码的解析，等待后续读取。

2. 拓展 markdown.render 方法，在其渲染结果的基础上，示例代码，使用 `vue-template-compiler` 将其编译成 Render Function，并作为整个示例页面的子组件引入;

3. 示例页面代码后续将被 `vue-loader` 处理，编译为最终文档。

## 渲染效果

::: tip 以下是使用 Demo Container V2 插件渲染的一个组件示例
其展示效果参照了 Element UI 文档组件 [demo-block.vue](https://github.com/ElemeFE/element/blob/dev/examples/components/demo-block.vue) 的实现
:::

::: demo 这个例子参考了 `Vue` 官方文档示例中 [GitHub 提交](https://cn.vuejs.org/v2/examples/commits.html) 实现，使用 Github API 获取仓库最新的提交数据，并且以列表形式将它们展示了出来。
```html
<template>
  <div class="vuepress-plugin-demo-container-v2-example">
    <input
      class="repo-name-input"
      autocomplete="off"
      placeholder="Change the repo name and press enter, such as vuejs/vue."
      v-model="inputRepoName"
      @keyup.enter="changeRepoName"
    />
    <h1>Latest Commits</h1>
    <span v-for="(branch, i) in branches" :key="`branch${i}`" class="branch">
      <input type="radio" :id="branch" :value="branch" name="branch" v-model="currentBranch" />
      <label :for="branch">{{ branch }}</label>
    </span>
    <p>{{ repoName }}@{{ currentBranch }}</p>
    <p v-if="loading">Request loading...</p>
    <div v-else>
      <p v-if="errMsg" class="danger-msg">Error: {{ errMsg }}.</p>
      <p v-else-if="commits.length === 0">Found the repository is no commit.</p>
      <ul v-else>
        <li v-for="(record, i) in commits" :key="`record${i}`">
          <a :href="record.html_url" target="_blank" class="commit">{{ record.sha.slice(0, 7) }}</a>
          -
          <span class="message">{{ record.commit.message | truncate }}</span>
          <br />by
          <span class="author">
            <a :href="record.author && record.author.html_url" target="_blank">{{ record.commit.author.name }}</a>
          </span>
          at
          <span class="date">{{ record.commit.author.date | formatDate }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputRepoName: '',
      repoName: 'wkcole/vuepress-plugin-demo-container-v2',
      branches: ['master', 'dev'],
      currentBranch: 'master',
      loading: false,
      commits: [],
      errMsg: null
    };
  },
  mounted() {
    this.fetchData();
  },
  watch: {
    repoName: 'fetchData',
    currentBranch: 'fetchData'
  },
  filters: {
    truncate: function(v) {
      var newline = v.indexOf('\n');
      return newline > 0 ? v.slice(0, newline) : v;
    },
    formatDate: function(v) {
      return v.replace(/T|Z/g, ' ');
    }
  },
  methods: {
    changeRepoName() {
      this.repoName = this.inputRepoName;
    },
    fetchData() {
      this.loading = true;
      const apiURL = `https://api.github.com/repos/${this.repoName}/commits?per_page=3&sha=${this.currentBranch}`;
      const xhr = new XMLHttpRequest();
      xhr.open('GET', apiURL);
      xhr.onerror = err => {
        this.errMsg = '连接错误，过于频繁的请求可能被拒绝';
      }
      xhr.onload = () => {
        const resp = JSON.parse(xhr.responseText);
        this.loading = false;
        if (Array.isArray(resp)) {
          this.errMsg = null;
          this.commits = resp
        } else {
          this.errMsg = resp.message;
        }
      };
      xhr.send();
    }
  }
};
</script>

<style>
.vuepress-plugin-v2-example .branch {
  margin-right: 8px;
}
.vuepress-plugin-demo-container-v2-example .danger-msg {
  color: #f56c6c;
}
.repo-name-input,
.edit {
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 20px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  color: inherit;
  padding: 6px;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.repo-name-input {
  padding: 16px;
  margin: 8px 0;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
}
</style>
```
:::

## 贡献者

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