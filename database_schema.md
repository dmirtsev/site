# Архитектура и схема базы данных "АстроТочка"

Этот документ описывает структуру базы данных для проекта "АстроТочка", предназначенную для использования с Prisma ORM и PostgreSQL.

## 1. Технологический стек

-   **База данных:** PostgreSQL
-   **ORM:** Prisma

## 2. Описание сущностей (таблиц)

-   **`User`**: Пользователи приложения. Хранит основную информацию из Telegram, а также игровые данные (уровень, баланс звезд).
-   **`Expert`**: Справочник экспертов. Содержит публичную информацию об авторах контента.
-   **`Tag`**: Справочник тем/тегов. Используется для категоризации контента и экспертов.
-   **`ContentSource`**: Метаданные об исходных материалах (видео, аудио лекции).
-   **`ContentItem`**: Основная таблица контента. Здесь хранятся все "производные продукты" (карточки, заметки, викторины).
-   **`Funnel`** и **`FunnelStep`**: Конструктор "Воронок Внимания", определяющий последовательность показа контента.
-   **`UserProgress`**: Таблица для отслеживания взаимодействий пользователя с контентом (просмотры, лайки, сохранения).

## 3. Схема для `schema.prisma`

Этот код можно скопировать в файл `schema.prisma` вашего Backend-проекта для автоматической генерации миграций и клиента Prisma.

```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// 1. Пользователи
model User {
  id            Int      @id @default(autoincrement())
  telegramId    BigInt   @unique
  firstName     String?
  lastName      String?
  username      String?
  level         Int      @default(1)
  starsBalance  Int      @default(0)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  progress      UserProgress[]
}

// 2. Справочник экспертов
model Expert {
  id          Int      @id @default(autoincrement())
  name        String
  photoUrl    String?
  bio         String?
  specialization String?
  topics      String[] // Массив тем, в которых эксперт силен
  
  contentItems ContentItem[] @relation("ExpertContent")
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
}

// 3. Справочник тегов
model Tag {
  id   Int    @id @default(autoincrement())
  name String @unique

  contentItems ContentItem[] @relation("TagContent")
  createdAt   DateTime   @default(now())
}

// 4. Исходные материалы
model ContentSource {
  id          Int      @id @default(autoincrement())
  sourceType  String   // "youtube_video", "audio_lecture", etc.
  path        String   // URL или путь к файлу
  author      String?  // Автор исходника, если это не эксперт
  
  derivedItems ContentItem[]
  createdAt   DateTime   @default(now())
}

// 5. Производный контент
model ContentItem {
  id            Int      @id @default(autoincrement())
  title         String
  type          String   // T1, T2, T3, T4, A1, K1, P1, V1 etc.
  contentHtml   String?  // Для текстовых форматов
  contentUrl    String?  // Для аудио/видео файлов
  status        String   @default("draft") // draft, approved, archived
  
  sourceId      Int
  source        ContentSource @relation(fields: [sourceId], references: [id])

  experts       Expert[] @relation("ExpertContent")
  tags          Tag[]    @relation("TagContent")

  steps         FunnelStep[]
  progress      UserProgress[]
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt
}

// 6. Воронки
model Funnel {
  id        Int      @id @default(autoincrement())
  name      String   @unique
  
  steps     FunnelStep[]
  createdAt DateTime @default(now())
}

model FunnelStep {
  id                Int      @id @default(autoincrement())
  stepNumber        Int
  delayHours        Int      @default(0) // Задержка в часах после предыдущего шага
  platform          String   // "telegram_channel", "mini_app", "xl_platform"
  
  funnelId          Int
  funnel            Funnel   @relation(fields: [funnelId], references: [id])
  
  contentItemId     Int
  contentItem       ContentItem @relation(fields: [contentItemId], references: [id])

  @@unique([funnelId, stepNumber])
}

// 7. Прогресс пользователя
model UserProgress {
  id          Int      @id @default(autoincrement())
  action      String   // "view", "like", "save"
  
  userId      Int
  user        User     @relation(fields: [userId], references: [id])

  contentItemId Int
  contentItem   ContentItem @relation(fields: [contentItemId], references: [id])

  createdAt   DateTime @default(now())

  @@unique([userId, contentItemId, action])
}
