# Vue3 Demo 演示相关

## 同时运行 `Playground/表单Schema生成器/活动编辑器`
```ssh
# Playground http://127.0.0.1:8800/
# 可视化表单Schema编辑器 http://127.0.0.1:8800/schema-generator.html
# （H5）活动编辑器 http://127.0.0.1:8800/vue-editor.html

yarn run demo:dev
```

## 单个运行（指定entry编译更快）
```ssh
# 只运行 Playground
yarn run demo:dev --dir=index

# 只运行 表单Schema生成器
yarn run demo:dev --dir=schema-generator

# 只运行（H5）活动编辑器
yarn run demo:dev --dir=vue-editor
```
