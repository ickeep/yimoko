# Getting Started with Yimoko

## 开始

### `npm install --global lerna`
全局安装 lerna
关于 [lerna](https://github.com/lerna/lerna) 

### `lerna bootstrap`
在当前 Lerna 仓库中执行引导流程（bootstrap）。安装所有 依赖项并链接任何交叉依赖。

### `npm run build:npm`
编译所有 npm 包，让包引用以及 demo 项目的依赖可用


# 包管理说明
各个包在 packages 里非 demo 开头的文件夹。使用 vite 进行构建。

##  脚本说明

### `npm run dev`
开发 实时构建生成 es、cjs、umd 文件。

### `npm run bulid`
构建生成 es、cjs、umd 文件。

### `test:watch`
运行单元测试，并进行 watch

### `test:unit`
运行单元测试