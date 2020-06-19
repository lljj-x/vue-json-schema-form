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
            <div  class="demo_container-buttonToolBox">
                <span
                    :class="['copy-action', { 'copying ': copied }]"
                    @click.stop="copyCode"
                >{{ copiedText }}</span>
                <button
                    type="button"
                    class="demo_container-button"
                    title="JSFiddle"
                    @click.stop="copyCode"
                >
                    <svg t="1547088289967" class="demo_container-icon" style="" viewBox="0 0 1170 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1952" xmlns:xlink="http://www.w3.org/1999/xlink" width="228.515625" height="200"><defs><style type="text/css"></style></defs><path d="M1028.571429 441.142857q63.428571 26.285714 102.571428 83.142857T1170.285714 650.857143q0 93.714286-67.428571 160.285714T940 877.714286q-2.285714 0-6.571429-0.285715t-6-0.285714H232q-97.142857-5.714286-164.571429-71.714286T0 645.142857q0-62.857143 31.428571-116t84-84q-6.857143-22.285714-6.857142-46.857143 0-65.714286 46.857142-112t113.714286-46.285714q54.285714 0 98.285714 33.142857 42.857143-88 127.142858-141.714286t186.571428-53.714285q94.857143 0 174.857143 46T982.571429 248.571429t46.571428 172q0 3.428571-0.285714 10.285714t-0.285714 10.285714zM267.428571 593.142857q0 69.714286 48 110.285714t118.857143 40.571429q78.285714 0 137.142857-56.571429-9.142857-11.428571-27.142857-32.285714T519.428571 626.285714q-38.285714 37.142857-82.285714 37.142857-31.428571 0-53.428571-19.142857T361.714286 594.285714q0-30.285714 22-49.714285t52.285714-19.428572q25.142857 0 48.285714 12t41.714286 31.428572 37.142857 42.857142 39.428572 46.857143 44 42.857143 55.428571 31.428572 69.428571 12q69.142857 0 116.857143-40.857143T936 594.857143q0-69.142857-48-109.714286t-118.285714-40.571428q-81.714286 0-137.714286 55.428571l53.142857 61.714286q37.714286-36.571429 81.142857-36.571429 29.714286 0 52.571429 18.857143t22.857143 48q0 32.571429-21.142857 52.285714t-53.714286 19.714286q-24.571429 0-47.142857-12t-41.142857-31.428571-37.428572-42.857143-39.714286-46.857143-44.285714-42.857143-55.142857-31.428571T434.285714 444.571429q-69.714286 0-118.285714 40.285714T267.428571 593.142857z" p-id="1953"></path></svg>
                </button>
                <button
                    type="button"
                    class="demo_container-button"
                    title="Codepen"
                    @click.stop="handleCodePen"
                >
                    <svg t="1547088271207" class="demo_container-icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1737" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M123.428571 668l344.571429 229.714286v-205.142857L277.142857 565.142857z m-35.428571-82.285714l110.285714-73.714286-110.285714-73.714286v147.428572z m468 312l344.571429-229.714286-153.714286-102.857143-190.857143 127.428572v205.142857z m-44-281.714286l155.428571-104-155.428571-104-155.428571 104zM277.142857 458.857143l190.857143-127.428572V126.285714L123.428571 356z m548.571429 53.142857l110.285714 73.714286V438.285714z m-78.857143-53.142857l153.714286-102.857143-344.571429-229.714286v205.142857z m277.142857-102.857143v312q0 23.428571-19.428571 36.571429l-468 312q-12 7.428571-24.571429 7.428571t-24.571429-7.428571L19.428571 704.571429q-19.428571-13.142857-19.428571-36.571429V356q0-23.428571 19.428571-36.571429L487.428571 7.428571q12-7.428571 24.571429-7.428571t24.571429 7.428571l468 312q19.428571 13.142857 19.428571 36.571429z" p-id="1738"></path></svg>
                </button>
            </div>
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
            showCode() {
                return this.options.showCode || {
                    codePen: true,
                    jsfiddle: false
                }
            },
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
            getCodeStr() {
                const pre = this.$el.querySelectorAll("pre")[0];
                if(pre) {
                    const str = pre.innerText;
                    // D:\code\git_my\vue-json-schema-form\node_modules\vue-template-compiler\build.js
                    debugger;

                }
                return {};
            },
            handleJSFiddle() {
                const codeObj = this.getCodeStr();
                debugger;
            },
            handleCodePen() {
                const codeObj = this.getCodeStr();
                debugger;
            },
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
                const {top, bottom, left} = this.$refs.meta.getBoundingClientRect();
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
