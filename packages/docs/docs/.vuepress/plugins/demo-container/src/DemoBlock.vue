<template>
    <div
        class="demo-block"
        :class="[blockClass, { 'hover': hovering }]"
        @mouseenter="hovering = true"
        @mouseleave="hovering = false"
    >
        <div class="demo-content">
            <div v-if="isOnlyShowCodeText"
                 style="font-size: 14px;padding: 0.1rem 1.5rem; border-left-width: 0.5rem;border-left-style: solid;border-color: #42b983;">
                {{ isOnlyShowCodeText }}
            </div>
            <ClientOnly v-else>
                <slot name="demo"></slot>
            </ClientOnly>
        </div>
        <div class="meta" ref="meta">
            <div class="description" v-if="!isOnlyShowCodeText && $slots.description">
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
            <div v-if="!isOnlyShowCodeText" class="demoContainer_buttonToolBox">
                <span
                    :class="['demoContainer_button demoContainer_button-copyAction', { 'copying ': copied }]"
                    @click.stop="copyCode"
                >{{ copiedText }}</span>
                <span style="padding: 0 10px;color: #ccc;">|</span>
                <span
                    :class="['demoContainer_button', { 'copying ': copied }]"
                    title="CodePen"
                    @click.stop="handleCodePen"
                >{{ runText }}</span>
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
            // showCode() {
            //     return this.options.showCode || {
            //         codePen: true,
            //         jsfiddle: false
            //     }
            // },
            isOnlyShowCodeText() {
                try {
                    const text = this.$slots.description && this.$slots.description[0].children[0].children[0].text;

                    const regText = /^\s*showCode:/;
                    if (regText.test(text)) {
                        return text.replace(regText, '');
                    }
                } catch (e) {
                    // nothing ...
                }

                return false;
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
            runText() {
                return this.langConfig['online-run'];
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
                const pre = [...this.$el.querySelectorAll("pre")].pop();
                if(pre) {
                    const str = pre.innerText;
                    const styleBlock = str.match(/<style>([\s\S]+)<\/style>/)
                    const htmlBlock = str.match(/<template>([\s\S]+)<\/template>/)
                    const scriptBlock = str.match(/<script>([\s\S]+)<\/script>/)
                    return {
                        style: styleBlock && styleBlock[1].replace(/^\n|\n$/g, ''),
                        html: htmlBlock && htmlBlock[1].replace(/^\n|\n$/g, ''),
                        script: scriptBlock && scriptBlock[1].replace(/^\n|\n$/g, ''),
                    }
                }
                return {};
            },
            handleJSFiddle() {
                const codeObj = this.getCodeStr();
            },
            handleCodePen() {
                const elementVersion = this.options.elementVersion || '2.13.0';
                const vjsfVersion = this.options.vjsfVersion;
                // since 2.6.2 use code rather than jsfiddle https://blog.codepen.io/documentation/api/prefill/
                const { script, html, style } = this.getCodeStr();
                const resourcesTpl =
                    '<scr' + 'ipt src="//unpkg.com/@lljj/polyfill@0.1.0/dist/polyfill.umd.min.js"></scr' + 'ipt>\n' +
                    '<scr' + 'ipt src="//unpkg.com/vue/dist/vue.js"></scr' + 'ipt>\n' +
                    '<scr' + `ipt src="//unpkg.com/element-ui@${ elementVersion }/lib/index.js"></scr` + 'ipt>\n' +
                    '<scr' + `ipt src="//unpkg.com/@lljj/vue-json-schema-form@${ vjsfVersion }/dist/vueJsonSchemaForm.umd.min.js"></scr` + 'ipt>\n';
                let jsTpl = (script || '').replace(/export default/, '\nvar Main =').trim();
                let htmlTpl = `${resourcesTpl}\n<div id="app">\n${html.trim()}\n</div>`;
                let cssTpl = `@import url("//unpkg.com/element-ui@${ elementVersion }/lib/theme-chalk/index.css");\n${(style || '').trim()}\n`;
                jsTpl = jsTpl
                    ? jsTpl + '\n\nvar Ctor = Vue.extend(Main)\nnew Ctor().$mount(\'#app\')'
                    : 'new Vue().$mount(\'#app\')';
                const data = {
                    js: jsTpl,
                    css: cssTpl,
                    html: htmlTpl
                };
                const form = document.getElementById('js_fiddleForm') || document.createElement('form');
                form.setAttribute('id', 'js_fiddleForm');
                while (form.firstChild) {
                    form.removeChild(form.firstChild);
                }
                form.method = 'POST';
                form.action = 'https://codepen.io/pen/define/';
                form.target = '_blank';
                form.style.display = 'none';
                const input = document.createElement('input');
                input.setAttribute('name', 'data');
                input.setAttribute('type', 'hidden');
                input.setAttribute('value', JSON.stringify(data));
                form.appendChild(input);
                document.body.appendChild(form);
                form.submit();
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
