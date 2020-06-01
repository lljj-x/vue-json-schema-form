---
home: true
pageClass: custom-page-home
heroImage: /logo.png
heroText: Vue JsonSchema Form
tagline: 基于 Vue 、JsonSchema快速构建一个带完整校验的form表单
footer: Apache2.0 Licensed | Copyright © 2018-2020 Jun
actionText: 快速开始 →
actionLink: /zh/guide/
---

### 上手简单
遵循 jsonSchema 规范，只需要给定jsonSchema，即可生成你需要的form表单

### 个性化
支持uiSchema吗 errSchema 快速配置个性化ui视图和校验错误信息，可快速适配常用的ui库，比如elementUi, iView 计划中...

### 长期更新
实际项目投入使用，保持更新

[![Netlify Status](https://api.netlify.com/api/v1/badges/863ec4c4-cbe6-45c9-a7b8-85ff6658947d/deploy-status)](https://app.netlify.com/sites/determined-lewin-59111e/deploys)


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

