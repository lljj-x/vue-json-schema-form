---
home: true
heroImage: /hero.png
heroText: Vue JsonSchema Form
tagline: 基于 Vue 、JsonSchema快速构建一个带完整校验的form表单
actionText: 快速开始 →
actionLink: /zh/guide/
features:
- title: 上手简单
  details: 遵循 jsonSchema 规范，只需要给定jsonSchema，即可生成你需要的form表单
- title: 个性化
  details: 支持uiSchema，errSchema 快速配置个性化ui视图和校验错误信息
- title: 长期更新
  details: 实际项目中也已使用，会
footer: Apache2.0 Licensed | Copyright © 2018-2020 Jun
---

### 快速体验
json Schema
Vue
Element

查看演练场
Playground

``` bash
# 安装
yarn global add vuepress # 或者：npm install -g vuepress

# 新建一个 markdown 文件
echo '# Hello VuePress!' > README.md

# 开始写作
vuepress dev .

# 构建静态文件
vuepress build .
```

::: warning 注意
目前的版本默认视图依赖elementUi，后续版本会解耦开来，可通过配置适配ElementUi，iView 或者你自己开发的组件库等
:::

