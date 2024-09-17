# 消费者项目 - 外卖应用

<h2>🌐</h2>
<ul>
  <li><a href="https://github.com/SamuelRocha91/consumy" target="_blank">Português</a></li>
  <li><a href="https://github.com/SamuelRocha91/consumy/blob/main/README_es.md" target="_blank">Español</a></li>
  <li><a href="https://github.com/SamuelRocha91/consumy/blob/main/README_en.md" target="_blank">English</a></li>
  <li><a href="https://github.com/SamuelRocha91/consumy/blob/main/README_ru.md" target="_blank">Русский</a></li>
  <li><a href="https://github.com/SamuelRocha91/consumy/blob/main/README_ch.md" target="_blank">中文</a></li>
  <li><a href="https://github.com/SamuelRocha91/consumy/blob/main/README_ar.md" target="_blank">العربية</a></li>
</ul>

这个仓库代表了一个用 Vue.js 开发的消费者应用，适用于外卖平台。这个应用允许用户浏览、选择和购买来自不同商店的产品。

![Consumy 使用示例](./assets/consumy.gif)

## 相关仓库

- [外卖后端](https://github.com/SamuelRocha91/delivery_back) - 用 Rails 开发的外卖平台后端应用
- [卖家应用](https://github.com/SamuelRocha91/seller_application) - 卖家应用

### 使用的概念和依赖项

这个项目涉及并使用以下概念和依赖项：

- **Vite：** 用作构建工具，以便快速高效地开发。
- **Vue.js 3：** 用于构建用户界面的渐进式 JavaScript 框架。
- **Vue Router：** Vue.js 的官方路由器。
- **Lodash：** 一个用于 JavaScript 的实用库，提供了多种常见编程任务的功能。
- **SweetAlert2：** 一个用于显示可自定义且吸引人的警告的库。
- **TypeScript：** JavaScript 的超集，增加了可选的静态类型。
- **EsLint 和 Prettier：** 用于静态代码分析和代码格式化的工具，确保代码的一致性和无错误。
- **Vitest：** 与 Vite 集成的单元测试工具，简化了测试的配置和执行过程。
- **JSX 支持：** 通过 `@vitejs/plugin-vue-jsx` 提供 JSX 支持。
- **dotenv 和 dotenv-webpack：** 环境变量管理。
- **事件处理与 @microsoft/fetch-event-source：** 用于管理服务器发送的事件。

## 项目设置

要进行集成使用，请参见：

- [外卖后端](https://github.com/SamuelRocha91/delivery_back) - 用 Rails 开发的外卖平台后端应用

要单独配置和运行该仓库，请按照以下步骤进行：

### 前提条件

确保您的计算机上已安装 Node.js 和 npm。

### 安装依赖项

```sh
npm install
```

### 启动开发服务器

要启动开发服务器：

```sh
npm run dev
```

### 构建生产版本

要构建生产版本的应用：

```sh
npm run build
```

### 预览生产构建

要预览生产构建：

```sh
npm run preview
```

### 运行单元测试

要运行单元测试：

```sh
npm run test:unit
```

---

该项目作为 LWSA 第九届 Quero Ser Dev 项目的评估要求而创建。

---