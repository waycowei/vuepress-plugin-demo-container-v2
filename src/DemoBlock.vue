<template>
  <div
    class="demo-block"
    :class="[blockClass, { 'hover': hovering }]"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <div class="demo-content">
      <slot name="demo"></slot>
    </div>
    <div class="meta" ref="meta">
      <div class="description" v-if="$slots.description">
        <slot name="description"></slot>
      </div>
      <div class="code-content">
        <slot name="source"></slot>
      </div>
    </div>
    <div
      class="demo-block-control"
      :class="{ 'is-fixed': fixedControl }"
      :style="{ 'width': fixedControl ? `${codeContentWidth}px` : 'unset' }"
      ref="control"
      @click="isExpanded = !isExpanded"
    >
      <transition name="arrow-slide">
        <i :class="[iconClass, { 'hovering': hovering }, 'icon']"></i>
      </transition>
      <transition name="text-slide">
        <span v-show="hovering">{{ controlText }}</span>
      </transition>
      <span
        v-show="!copied"
        :class="['copy-action', { 'copying ': copied }]"
        @click.stop="copyCode"
      >{{ copiedText }}</span>
      <transition name="bounce">
        <span v-show="copied" class="copy-action copy-action-success">{{ copiedText }}</span>
      </transition>
    </div>
  </div>
</template>

<script type="text/babel">
import defaultLang from './i18n/default_lang.json';
export default {
  data() {
    return {
      hovering: false,
      copied: false,
      isExpanded: false,
      fixedControl: false,
      codeContentWidth: 0,
      scrollParent: null
    };
  },
  props: {
    options: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    compoLang() {
      return this.options.locales || defaultLang
    },
    langConfig() {
        return this.compoLang.filter(config => config.lang === this.$lang)[0]['demo-block'];
    },
    blockClass() {
      return `demo-${this.$lang} demo-${this.$router.currentRoute.path
        .split("/")
        .pop()}`;
    },
    iconClass() {
      return this.isExpanded ? "caret-top" : "caret-bottom";
    },
    controlText() {
      return this.isExpanded ? this.langConfig['hide-text'] : this.langConfig['show-text'];
    },
    copiedText() {
      return this.copied ? this.langConfig['copy-success'] : this.langConfig['copy-text'];
    },
    codeArea() {
      return this.$el.getElementsByClassName("meta")[0];
    },
    codeAreaHeight() {
      if (this.$el.getElementsByClassName("description").length > 0) {
        return (
          this.$el.getElementsByClassName("description")[0].clientHeight +
          this.$el.getElementsByClassName("code-content")[0].clientHeight +
          20
        );
      }
      return this.$el.getElementsByClassName("code-content")[0].clientHeight;
    }
  },
  methods: {
    copyCode() {
      if (this.copied) {
        return;
      }
      const pre = this.$el.querySelectorAll("pre")[0];
      pre.setAttribute("contenteditable", "true");
      pre.focus();
      document.execCommand("selectAll", false, null);
      this.copied = document.execCommand("copy");
      pre.removeAttribute("contenteditable");
      setTimeout(() => {
        this.copied = false;
      }, 1500);
    },
    scrollHandler() {
      const { top, bottom, left } = this.$refs.meta.getBoundingClientRect();
      this.fixedControl =
        bottom > document.documentElement.clientHeight &&
        top + 44 <= document.documentElement.clientHeight;
      this.$refs.control.style.left = this.fixedControl ? `${left}px` : "0";
    },
    removeScrollHandler() {
      this.scrollParent &&
        this.scrollParent.removeEventListener('scroll', this.scrollHandler);
    }
  },
  watch: {
    isExpanded(val) {
      this.codeArea.style.height = val ? `${this.codeAreaHeight + 1}px` : "0";
      if (!val) {
        this.fixedControl = false;
        this.$refs.control.style.left = "0";
        this.removeScrollHandler();
        return;
      }
      setTimeout(() => {
        this.scrollParent = document;
        this.scrollParent &&
          this.scrollParent.addEventListener('scroll', this.scrollHandler);
        this.scrollHandler();
      }, 200);
    }
  },
  mounted() {
    this.$nextTick(() => {
      let codeContent = this.$el.getElementsByClassName('code-content')[0];
      this.codeContentWidth = this.$el.offsetWidth
      if (this.$el.getElementsByClassName('description').length === 0) {
        codeContent.style.width = "100%";
        codeContent.borderRight = "none";
      }
    });
  },
  beforeDestroy() {
    this.removeScrollHandler();
  }
};
</script>
<style scoped>
.demo-block {
  border: solid 1px #ebebeb;
  border-radius: 3px;
  transition: 0.2s;
  margin-top: 15px;
  margin-bottom: 15px;
}
.demo-block .meta .code-content > div,
.demo-block .meta div[class*="language-"] {
  background: #fafafa;
  
}
.demo-block .meta div[class*="language-"] {
  border: none;
  border-radius: 0;
}
.demo-block .meta div[class*="language-"]::before {
  color: #3182bd;
}
.demo-block .meta pre code,
.demo-block .meta pre[class*="language-"] code,
.demo-block .meta .token.operator {
  color: #000;
}
.demo-block .meta .code-content div[class*="language-"].line-numbers-mode::after {
  width: 2rem;
  background-color: #fafafa;
  border: none;
}
.demo-block .meta .code-content div[class*="language-"].line-numbers-mode .line-numbers-wrapper .line-number {
  color: #756bb1;
}
.demo-block .meta .code-content div[class*="language-"].line-numbers-mode .line-numbers-wrapper {
  width: 2rem;
}
.demo-block .meta .code-content div[class*="language-"].line-numbers-mode pre {
  padding-left: 2.5rem;
}
.demo-block .meta pre[class*="language-"]::-webkit-scrollbar {
  width: 12px;
  height: 12px;
  border-radius: 4px;
  background-color: #fafafa;
}
.demo-block .meta pre[class*="language-"]::-webkit-scrollbar-track {
  background-color: #fafafa;
}
.demo-block .meta pre[class*="language-"]::-webkit-scrollbar-thumb {
  background-color: #CBCBCB;
}
.demo-block .meta .token.tag,
.demo-block .meta .token.punctuation,
.demo-block .meta .token.attr-name,
.demo-block .meta .token.keyword,
.demo-block .meta .token.function,
.demo-block .meta .hljs-selector-class,
.demo-block .meta .token.selector {
  color: #3182bd;
}
.demo-block .meta .token.attr-value,
.demo-block .meta .token.string {
  color: #756bb1;
}
.demo-block .meta .token.property {
  color: #e6550d;
}
.demo-block.hover {
  box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6), 0 2px 4px 0 rgba(232, 237, 250, 0.5);
}
.demo-block code {
  font-family: Menlo, Monaco, Consolas, Courier, monospace;
}
.demo-block .demo-button {
  float: right;
}
.demo-block .demo-content {
  padding: 24px;
}
.demo-block .meta {
  background: #fafafa;
  border-top: solid 1px #ebebeb;
  overflow: hidden;
  height: 0;
  transition: height 0.2s;
}
.demo-block .description {
  border-bottom: 1px solid #ebebeb;
  padding: 20px;
  box-sizing: border-box;
  border: solid 1px #ebebeb;
  border-radius: 3px;
  font-size: 14px;
  line-height: 22px;
  color: #666;
  word-break: break-word;
  margin: 10px;
  background-color: #fff;
}
.demo-block .description + .code-content {
  border-top: 1px solid #ebebeb;
}
.demo-block .demo-block-control {
  border-top: solid 1px #ebebeb;
  height: 44px;
  box-sizing: border-box;
  background-color: #fff;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  text-align: center;
  margin-top: -1px;
  color: #d3dce6;
  cursor: pointer;
  position: relative;
}
.demo-block .demo-block-control.is-fixed {
  position: fixed;
  bottom: 0;
  width: 660px;
  z-index: 999;
}
.demo-block .demo-block-control .icon {
  font-family: element-icons !important;
  font-style: normal;
  font-weight: 400;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  vertical-align: baseline;
  display: inline-block;
  -webkit-font-smoothing: antialiased;
}
.demo-block .demo-block-control .caret-top::before {
  content: "";
  position: absolute;
  right: 50%;
  width: 0;
  height: 0;
  border-bottom: 7px solid #ccc;
  border-right: 5px solid transparent;
  border-left: 5px solid transparent;
}
.demo-block .demo-block-control .caret-bottom::before {
  content: "";
  position: absolute;
  right: 50%;
  width: 0;
  height: 0;
  color: #d3dce6;
  border-top: 7px solid #ccc;
  border-right: 5px solid transparent;
  border-left: 5px solid transparent;
}
.demo-block .demo-block-control i {
  font-size: 16px;
  line-height: 44px;
  transition: 0.3s;
}
.demo-block .demo-block-control i.hovering {
  transform: translateX(-40px);
}
.demo-block .demo-block-control > span {
  position: absolute;
  transform: translateX(-30px);
  font-size: 14px;
  line-height: 44px;
  transition: 0.3s;
  display: inline-block;
}
.demo-block .demo-block-control .copy-action {
  right: 0px;
  color: #409eff;
}
.demo-block .demo-block-control.copying {
  transform: translateX(-44px);
}
.demo-block .demo-block-control:hover {
  color: #409eff;
  background-color: #f9fafc;
}
.demo-block .demo-block-control .text-slide-enter,
.demo-block .demo-block-control .text-slide-leave-active {
  opacity: 0;
  transform: translateX(10px);
}
.demo-block .demo-block-control .bounce-enter-active {
  font-weight: bolder;
}
.demo-block .demo-block-control .control-button {
  line-height: 26px;
  position: absolute;
  top: 0;
  right: 0;
  font-size: 14px;
  padding-left: 5px;
  padding-right: 25px;
}

</style>
