# Проект Потребителя - Приложение для Доставки

<h2>🌐</h2>
<ul>
  <li><a href="https://github.com/SamuelRocha91/consumy" target="_blank">Português</a></li>
  <li><a href="https://github.com/SamuelRocha91/consumy/blob/main/README_es.md" target="_blank">Español</a></li>
  <li><a href="https://github.com/SamuelRocha91/consumy/blob/main/README_en.md" target="_blank">English</a></li>
  <li><a href="https://github.com/SamuelRocha91/consumy/blob/main/README_ru.md" target="_blank">Русский</a></li>
  <li><a href="https://github.com/SamuelRocha91/consumy/blob/main/README_ch.md" target="_blank">中文</a></li>
  <li><a href="https://github.com/SamuelRocha91/consumy/blob/main/README_ar.md" target="_blank">العربية</a></li>
</ul>

Этот репозиторий представляет приложение потребителя, разработанное на Vue.js, для платформы доставки. Это приложение позволяет пользователям просматривать, выбирать и покупать продукты из различных магазинов.

![Иллюстрация использования Consumy](./assets/consumy.gif)

## Связанные Репозитории

- [Backend для Доставки](https://github.com/SamuelRocha91/delivery_back) - Приложение на Rails для платформы доставки
- [Приложение Продавца](https://github.com/SamuelRocha91/seller_application) - Приложение для продавца

### Используемые Концепции и Зависимости

Этот проект включает и использует следующие концепции и зависимости:

- **Vite:** Используется как инструмент сборки для быстрого и эффективного разработки.
- **Vue.js 3:** Прогрессивный JavaScript-фреймворк для создания пользовательских интерфейсов.
- **Vue Router:** Официальный маршрутизатор для Vue.js.
- **Lodash:** Утилитарная библиотека для JavaScript, предоставляющая различные функции для общих задач программирования.
- **SweetAlert2:** Библиотека для отображения настраиваемых и привлекательных предупреждений.
- **TypeScript:** Надстройка над JavaScript, добавляющая необязательную статическую типизацию.
- **EsLint и Prettier:** Инструменты для статического анализа кода и форматирования кода, соответственно, обеспечивая консистентность и отсутствие ошибок в коде.
- **Vitest:** Инструмент для юнит-тестирования, интегрированный с Vite, упрощающий настройку и выполнение тестов.
- **Поддержка JSX:** Поддержка JSX с помощью `@vitejs/plugin-vue-jsx`.
- **dotenv и dotenv-webpack:** Управление переменными окружения.
- **Обработка Событий с @microsoft/fetch-event-source:** Используется для управления событиями, отправляемыми сервером.

## Настройка Проекта

Для интегрированного использования, смотри:

- [Backend для Доставки](https://github.com/SamuelRocha91/delivery_back) - Приложение на Rails для платформы доставки

Чтобы настроить и запустить репозиторий отдельно, следуйте этим шагам:

### Предварительные Требования

Убедитесь, что Node.js и npm установлены на вашем компьютере.

### Установка Зависимостей

```sh
npm install
```

### Запуск Серверa Разработки

Для запуска сервера разработки:

```sh
npm run dev
```

### Сборка для Продакшена

Для сборки приложения для продакшена:

```sh
npm run build
```

### Предварительный Просмотр Сборки для Продакшена

Для предварительного просмотра сборки для продакшена:

```sh
npm run preview
```

### Выполнение Юнит-Тестов

Для выполнения юнит-тестов:

```sh
npm run test:unit
```

---

Этот проект был создан в качестве требования для программы Quero Ser Dev 9-е издание от LWSA.

---