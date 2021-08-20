# Introduction

`Demo Container V2` is a `Vuepress-based` plug-in, which can help you add `Vue` examples when writing documents. Its original intention is to reduce the difficulty of adding some related examples when writing component documents.

## How does it work?

The Demo Container V2 uses Vuepress's [chainMarkdown, extendMarkdown API](https://vuepress.vuejs.org/plugin/option-api.html#extendmarkdown) to expand its internal markdown object and does the following:

1. Based on [markdown-it-container](https://github.com/markdown-it/markdown-it-container), a plug-in that recognizes the following code blocks is built
```
:::demo xxx
xxx
:::
```
Wrap code by `<demo-block> </demo-block>` component, wait for subsequent reading;

2. Expand the `markdown.render` method, based on its rendering results, read the sample code annotated by `pre-render-demo` and use `vue-template-compiler` compile it into a Redner Function and introduce it as a subcomponent of the entire sample page.

3. The sample page code will be processed by `vue-loader` and compiled into the final document

## What is the rendering effect?

::: tip The following is an example of a component rendered using the Demo Container plugin
The display effect refers to the implementation of Element UI document component [demo-block.vue](https://github.com/ElemeFE/element/blob/dev/examples/components/demo-block.vue)
:::

::: demo This example refers to the [GitHub submission](https://vuejs.org/v2/examples/commits.html) implementation in the example of the `Vue` official document, uses the Github API to get the latest submission data of the repository, and displays them in a list.
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
      repoName: 'waycowei/vuepress-plugin-demo-container-v2',
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
        this.errMsg = '连接错误,过于频繁的请求可能被拒绝';
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
.vuepress-plugin-demo-container-v2-example .branch {
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

## Contributor

<p>
  <a-tooltip title="JianhuiChen">
    <a href="https://github.com/calebman" target="_blank">
      <a-avatar src="https://avatars0.githubusercontent.com/u/27751088" :size="54"/>
    </a>
  </a-tooltip>
  <a-tooltip title="WaycoWei">
    <a href="https://github.com/waycowei" target="_blank">
      <a-avatar src="https://avatars.githubusercontent.com/u/8675871" :size="54"/>
    </a>
  </a-tooltip>
</p>