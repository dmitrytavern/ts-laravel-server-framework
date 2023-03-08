# Minimal implementation of Laravel in Node.js (old)

I really like Laravel. Folder structure, syntax of some entries, appearance. Everything is concise, clear and complex at the same time. Therefore, I wanted to implement a minimally working version of Laravel on Node.js.

## Technology stack

- Express - server framework that runs the project.
- i18m - library for implementing multilingual sites.
- pug - library for implementing the functionality of the blade templating engine.
- Sequelize - framework for working with databases. Model building, migrations and more.

## How to install

1. Clone repo

2. Install deps

```
npm i
```

3. Copy .env

```
cp .env.example .env
```

4. Start

```
npm run start
```

5. Visit http://localhost:8081

## File structure

### app

The app directory holds the base code for the application.

- app/Http/Controllers - similar to Laravel, contains controllers. In this implementation, they are needed as a user request processing. get, post requests and send Express response.

- app/Http/Middleware - by analogy with Laravel, it processes the user request by injecting itself in front of the controller and executing arbitrary code.

- app/Http/Kernel - serves to register all middleware classes.

- app/Http/Models - by analogy with Laravel, stores all models for database management. The Sequelize syntax is used.

All these files are included when running bootstrap scripts.

### bootstrap

The bootstrap directory contains all the bootstrapping scripts used for the application. It includes all the main files of the application and also provides the most basic functionality.

### config

The config directory holds all the project configuration files (.config).

At the moment it contains only db.config.js, for configuring the database.

### database

The database directory contains the database files.

Similar to Laravel, contains files for migration.

### public

The public directory helps start the project and maintains other necessary files such as JavaScript, CSS, and images of your project.

### resources

The resources directory holds all the Sass files, Pug files, language (localization) files.

- resources/lang - by analogy with Laravel, contains files with localization.

- resources/view - similar to Laravel, contains pug template files for generating html pages.

### routes

The routes directory contains all your definition files for routing, such as api.php, web.php, etc.

### types

The types directory contains typescript declarations.

## Basic functions

### Controllers

```ts
import { Request, Response } from "express";

export default class MainController {
  index(req: Request, res: Response) {
    res.render("index", { title: "Wow", message: "Hello" });
  }
}
```

### Middleware

```ts
import { Request, Response, NextFunction } from "express";

export default class Authenticate {
  handle(req: Request, res: Response, next: NextFunction) {
    next();
  }
}
```

### Models

```ts
import { Model, DataTypes, Optional, Sequelize } from "sequelize";

interface IModelAttributes {
  id: number;
  name: string;
}
interface IModelCreation extends Optional<IModelAttributes, "id"> {}
export interface IModel extends Model<IModelAttributes, IModelCreation>, IModelAttributes {}

export default function (sequelize: Sequelize) {
  return sequelize.define<IModel>("User", {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER.UNSIGNED,
    },
    name: {
      type: DataTypes.STRING,
    },
  });
}
```

### Routing

```ts
export default function (app: Router): void {
  const { view, middleware } = process.app.router;

  app.get("/", view("MainController@index"));

  app.get("/profile", middleware("auth"), view("MainController@index"));
}
```

### Pug

- route - custom function in the Localization middleware that returns the specified path with the selected localization added.

- routeLocalized - custom function in the Localization middleware that translates the current page to the same page, but with a different language.

```pug
html
    head
        title #{ __('home.title')}
    body
        a(href=routeLocalized('en')) English <br>
        a(href=routeLocalized('ru')) Russian

        h1= route('/s')
```

### Lang

```json
{
  "home.title": "Home page"
}
```

### Migrations

```js
"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Users");
  },
};
```
