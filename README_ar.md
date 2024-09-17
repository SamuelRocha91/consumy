# مشروع المستهلك - تطبيق توصيل

<h2>🌐</h2>
<ul>
  <li><a href="https://github.com/SamuelRocha91/consumy" target="_blank">Português</a></li>
  <li><a href="https://github.com/SamuelRocha91/consumy/blob/main/README_es.md" target="_blank">Español</a></li>
  <li><a href="https://github.com/SamuelRocha91/consumy/blob/main/README_en.md" target="_blank">English</a></li>
  <li><a href="https://github.com/SamuelRocha91/consumy/blob/main/README_ru.md" target="_blank">Русский</a></li>
  <li><a href="https://github.com/SamuelRocha91/consumy/blob/main/README_ch.md" target="_blank">中文</a></li>
  <li><a href="https://github.com/SamuelRocha91/consumy/blob/main/README_ar.md" target="_blank">العربية</a></li>
</ul>

هذا المستودع يمثل تطبيق المستهلك، والذي تم تطويره باستخدام Vue.js، وهو مخصص لمنصة توصيل. يتيح هذا التطبيق للمستخدمين تصفح واختيار وشراء منتجات من متاجر مختلفة.

![مثال لاستخدام تطبيق Consumy](./assets/consumy.gif)

## المستودعات المرتبطة

- [خلفية التوصيل](https://github.com/SamuelRocha91/delivery_back) - تطبيق خلفي مبني باستخدام Rails لمنصة التوصيل
- [تطبيق البائع](https://github.com/SamuelRocha91/seller_application) - تطبيق للبائع

### المفاهيم والاعتماديات المستخدمة

يغطي هذا المشروع ويستخدم المفاهيم والاعتماديات التالية:

- **Vite:** تستخدم كأداة بناء لتطوير سريع وفعال.
- **Vue.js 3:** إطار عمل JavaScript تدريجي لبناء واجهات المستخدم.
- **Vue Router:** التوجيه الرسمي لـ Vue.js.
- **Lodash:** مكتبة أدوات لـ JavaScript توفر العديد من الوظائف لمهام البرمجة الشائعة.
- **SweetAlert2:** مكتبة لعرض التنبيهات القابلة للتخصيص والجذابة.
- **TypeScript:** مجموعة من JavaScript تضيف typing ثابتة اختيارية.
- **EsLint و Prettier:** أدوات لتحليل الكود الثابت وتنسيق الكود، لضمان تناسق الكود وخلوه من الأخطاء.
- **Vitest:** أداة اختبار وحدات مدمجة مع Vite، تبسط عملية إعداد وتشغيل الاختبارات.
- **دعم JSX:** دعم JSX عبر `@vitejs/plugin-vue-jsx`.
- **dotenv و dotenv-webpack:** إدارة متغيرات البيئة.
- **معالجة الأحداث باستخدام @microsoft/fetch-event-source:** تستخدم لإدارة الأحداث التي يرسلها الخادم.

## إعداد المشروع

لاستخدام مدمج، يرجى الاطلاع على:

- [خلفية التوصيل](https://github.com/SamuelRocha91/delivery_back) - تطبيق خلفي مبني باستخدام Rails لمنصة التوصيل

لتكوين وتشغيل المستودع بشكل فردي، اتبع الخطوات التالية:

### المتطلبات الأساسية

تأكد من أنك قد قمت بتثبيت Node.js و npm على جهاز الكمبيوتر الخاص بك.

### تثبيت الاعتماديات

```sh
npm install
```

### بدء خادم التطوير

لبدء خادم التطوير:

```sh
npm run dev
```

### بناء النسخة الإنتاجية

لبناء تطبيق النسخة الإنتاجية:

```sh
npm run build
```

### معاينة بناء الإنتاج

لمعاينة بناء الإنتاج:

```sh
npm run preview
```

### تشغيل اختبارات الوحدات

لتشغيل اختبارات الوحدات:

```sh
npm run test:unit
```

---

تم إنشاء هذا المشروع كمتطلب تقييم لبرنامج Quero Ser Dev النسخة التاسعة من LWSA.

---