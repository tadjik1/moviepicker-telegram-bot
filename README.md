# MoviePicker Telegram Bot 🎬

Телеграм‑бот на **TypeScript/Node.js** и **[grammY](https://grammy.dev)**, который превращает ваш 
текстовый запрос в подборку фильмов и сериалов.

---

## 💡 Что умеет бот

1. **Понимает запрос** — отправляет ваш текст в **OpenAI** и получает список рекомендаций.
2. **Обогащает данные** — запрашивает подробную информацию в неофициальном **API Кинопоиска** (название, год, рейтинг, постер, описание).
3. **Отвечает красиво** — присылает сообщения с постерами, кратким описанием и инлайн‑кнопками, ведущими прямо в онлайн‑кинотеатры (ivi, Okko, Кинопоиск HD и т.д.).

---

## 🛠 Технологический стек

| Компонент        | Выбор            |
| ---------------- | ---------------- |
| Среда выполнения | Node.js 20+      |
| Язык             | TypeScript 5     |
| Telegram SDK     | grammY 1.36      |
| ИИ               | OpenAI Chat API  |
| Источник данных  | API Кинопоиска   |
| Переменные среды | dotenv           |
| DX               | ts‑node, nodemon |

---

## 🚀 Быстрый старт (локально)

```bash
git clone https://github.com/tadjik1/moviepicker-telegram-bot.git
cd moviepicker-telegram-bot

# 1️⃣ Установите зависимости
npm install

# 2️⃣ Создайте файл окружения
cp .env.example .env
# затем вставьте реальные токены в .env

# 3️⃣ Запустите в режиме разработки
npm run start
```

Запуск в продакшене:

```bash
npm run build       # компилирует JS в /dist
node dist/index.js
```

---

## 📄 Пример `.env.example`

```dotenv
# ==== Telegram ====
BOT_TOKEN=123456:ABC-DEF

# ==== OpenAI ====
OPENAI_API_KEY=sk-...

# ==== Kinopoisk ====
KINOPOISK_API_KEY=your_kinopoisk_api_key
```

---

## 🗂 Структура проекта

```
.
├── src/
│   ├── index.ts        # точка входа: инициализация бота и middlewares
│   ├── openai.ts       # обращения к OpenAI
│   ├── kinopoisk.ts    # клиент Кинопоиска
│   └── utils/
├── .env.example
├── tsconfig.json
└── package.json
```

---

## 🤝 Вклад

Pull‑request’ы и issue приветствуются! Перед созданием PR запустите **`npm run build`** и убедитесь, что типы корректны.

---

## 📜 Лицензия

ISC — делайте что угодно, но не удаляйте копирайт и дисклеймер.
