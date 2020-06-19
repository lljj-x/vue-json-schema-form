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
import './style/index.styl'
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
