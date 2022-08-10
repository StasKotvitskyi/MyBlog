# MyBlog

##SUMMARY
This is my first full-length project. It was created during the course "Angular 9. Theory and Practice 2020 (UDEMY)". Main emphasis was placed on implementation of Angular functionality.
This application is a simple blog. Backend functionality is provided by the Firebase service (https://firebase.google.com). Application consists of 2 parts: main (for visitors) and administrative. Administrative part also includes authorization.
###Main
Main part is a page with post-cards and a button to enter the admin panel. Clicking "Відкрити" ("Open") button in the post card, you can open and view the post. This transition (and others) is carried out by routing – that is, in fact, there is a change of components. Post page displays post content, title, author, date and time of post creating. Also post page contains "На головну" ("Main") button to return to the main page (https://myblog-1d8f8.web.app).
Clicking "Перейти до панелі адміністратора" ("Go to admin panel") button redirects to the admin panel (dashboard) or to the authorization page (if authorization has not been completed earlier or the session time has expired).
###Authorization
Login page (https://myblog-1d8f8.web.app/admin/login) contains a form that includes two fields: "Email" and "Пароль" ("Password"). This form is created using "Reactive Forms" and inputs works with validation. Specific messages appear near the input field when it is invalid. Session duration in the admin panel after authorization is 1 hour. Restriction of access to the components of admin panel implemented by using guards and authorization service.
###Admin Panel
Admin dashboard page (https://myblog-1d8f8.web.app/admin/dashboard) contains a navigation panel, a search field and a post table.
Navigation panel contains 4 buttons: "Головна" ("Main"), "Адмін-панель" ("Admin panel"), "Створити" ("Create") and "Вийти" ("LogOut").
Clicking "Головна" ("Main") button redirects to the main page (https://myblog-1d8f8.web.app). In this case, authorization is preserved. To get to the main page from the admin panel or authorization page, you can click on the title "MyBlog".
Clicking "Головна" ("Admin panel") button returns to the admin panel (https://myblog-1d8f8.web.app/admin/dashboard).
Clicking "Створити" ("Create") button redirects to the page for creating a new post (https://myblog-1d8f8.web.app/admin/create).
Clicking "Вийти" ("LogOut") button cancels the authorization and redirects to the authorization page (https://myblog-1d8f8.web.app/admin/login). Search field is used for searching in titles and post contents. At the same time, the posts table is dynamically updated (depending on the match to the search results). Dynamic updating of the table is provided by using a custom pipe.
Each post in the post table is represented as a row. Table consists of 5 columns: "№", "Автор" ("Author"), "Заголовок" ("Title"), "Дата" ("Date") and "Дія" ("Action").
Cell "Дія" ("Action") of a post contains 2 buttons: "Редагувати" ("Edit") and "Видалити" ("Delete").
Clicking "Редагувати" ("Edit") button redirects to the post editing page (https://myblog-1d8f8.web.app/admin/post/id/edit) ("id" is an identifier that generated and assigned on backend side).
Clicking "Видалити" ("Delete") button sends a request to delete a post on server and deletes the post from the local storage (if request to the server was successful).
###Other pages
Post creation page (https://myblog-1d8f8.web.app/admin/create) contains a form that is also created using "Reactive Forms", its fields also have validation. The form contains 3 fields: "Заголовок" ("Title"), "Контент" ("Content") and "Автор" ("Author"). The "Контент" ("Content") field is implemented using the "ngx-quill" plugin. This plugin allows to create a panel with possibility to create rich text and add media files.
Post edit page (https://myblog-1d8f8.web.app/admin/post/id/edit) looks like the post creation page. Difference lies in the route parameters ("id") and the request method that is called by the "Зберегти зміни" ("Save changes") button.


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
