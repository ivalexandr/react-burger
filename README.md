# О проекте

Учебный проект представляет собой веб-приложение конструктора и заказа космических бургеров.
Основной стек: HTML, CSS, JavaScript, TypeScript, React.js, Redux.
Проект создан при помощи [Create-react-app](https://create-react-app.dev/ "Create-react-app")

## Основной функционал

+ Возможность создания своего уникального бургера с помощью конструктора;
+ Сортировка ингредиентов бургера перетаскиванием;
+ Удаление ингредиентов бургера из конструктора;
+ Модальные окна с информацией о заказе и об ингредиентах;
+ Обновление карточек заказов, используя WebSocket;
+ Регистрация, авторизация пользователя;
+ Изменение данных о пользователе через личный кабинет;
+ Выход из личного кабинета;
+ Восстановление пароля пользователя;

## Пакеты которые используются в сборке

Здесь перечислены пакеты, которые не входят в сборку при создании проекта с помощью [Create-react-app](https://create-react-app.dev/ "Create-react-app")

+ [Redux](https://www.npmjs.com/package/redux "Redux")
+ [React-redux](https://www.npmjs.com/package/react-redux "React-redux")
+ [Redux-Toolkit](https://www.npmjs.com/package/@reduxjs/toolkit "Redux Toolkit")
+ [React-router-dom](https://www.npmjs.com/package/react-router-dom "React-router-dom")
+ [React-Developer-Burger-UI-Components](https://www.npmjs.com/package/@ya.praktikum/react-developer-burger-ui-components "React Developer Burger UI Components")
+ [React-dnd](https://www.npmjs.com/package/react-dnd "React DnD")
+ [React-dnd-html5-backend](https://www.npmjs.com/package/react-dnd-html5-backend "React DnD HTML5 Backend")
+ [Redux-logger](https://www.npmjs.com/package/redux-logger "Redux-logger")
+ [Classnames](https://www.npmjs.com/package/classnames "classnames")
+ [Cypress](https://www.npmjs.com/package/cypress "Cypress")

## Инструкция по запуску
+ Загрузить или клонировать данный репозиторий к себе;
+ Выполнить установку пакетов  при помощи `npm i` или `yarn`;
+ Запустить в development-режиме `npm run start` или `yarn start`;
+ Запустить в production-режиме `npm run build` или `yarn build`;
+ Запуск jest-тестов `npm run test` или `yarn test`;
+ Запуск cypress-тестов `npm run cypress:open` или `yarn cypress:open`;
