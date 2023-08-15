# BS.Shoppe — демо-проект

## Использованные технологии

- [npm workspaces](https://docs.npmjs.com/cli/v9/using-npm/workspaces): для разделения проекта на бэкенд, фронтенд и общую часть
- [Vue3](https://v3.ru.vuejs.org/): реактивный фреймворк для фронтенда
- [Pinia](https://pinia.vuejs.org/): рекомендованное хранилище для Vue3
- [Vite](https://vitejs.dev/): самый быстрый сборщик приложений для фронтенда
- [TypeScript](https://www.typescriptlang.org/): строгая типизация для JavaScript
- [SSR](https://vitejs.dev/guide/ssr.html): серверный рендеринг Vue3 на основе Vite
- [Express](https://expressjs.com/ru/): для работы бэкенда и серверного рендеринга фронтенда
- [esbuild](https://esbuild.github.io/): скоростной сборщик, использован для бэкенда

## Установка

```
git clone https://github.com/Ser5/bs-shoppe/
cd bs-shoppe
npm install
cp packages/backend/filesdb-example/* packages/backend/filesdb-data/
```

## Запуск dev-версии

Бэкенд:

```
cd packages/backend/
npm run dev
```

Фронтенд:

```
cd packages/frontend/
npm run dev
```

## Запуск стандартной версии

Бэкенд:

```
cd packages/backend/
npm run build
npm run start
```

Фронтенд:

```
cd packages/frontend/
npm run build
npm run start
```

## Использование

Открыть в браузере ссылку

<http://127.0.0.1:5173/>
