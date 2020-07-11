<template>
    <pre :class="$style.pre" v-html="prettyString"></pre>
</template>

<script>
    export default {
        name: 'JsonPrettyPrint',
        props: {
            jsonString: {
                type: [String, Array, Object],
                default: '',
                required: true,
            },
        },
        computed: {
            prettyString() {
                try {
                    const string = String(this.jsonString) === this.jsonString ? this.jsonString : JSON.stringify(this.jsonString, null, 2);
                    const handleString = string.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
                    const regex = /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g;

                    return handleString.replace(regex, (match) => {
                        let className = 'number';

                        if (/^"/.test(match)) {
                            if (/:$/.test(match)) {
                                className = 'key';
                            } else {
                                className = 'string';
                            }
                        } else if (/true|false/.test(match)) {
                            className = 'boolean';
                        } else if (/null/.test(match)) {
                            className = 'null';
                        }

                        return `<span class="${className}">${match}</span>`;
                    });
                } catch (e) {
                    return '<span style="padding: 20px 0;">解析失败</span>';
                }
            }
        }
    };
</script>

<style module lang="stylus">
    .pre {
        outline: 1px solid #ccc;
        background-color: #FFFFFF;
        padding: 5px;
        margin: 5px;
        text-align: left;
        overflow: hidden;
        :global {
            .string {
                color: #e91e63;
            }

            .number {
                color: #00bcd4;
            }

            .boolean {
                color: #ff00ff;
            }

            .null {
                color: #9e9e9e;
            }

            .key {
                color: #3753a9;
            }
        }
    }
</style>
