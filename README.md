# Restaurant Poll

This application consists of a POC (Proof of Concept) with the objective of solving the 30 minutes spent by the DBServer teams, every day, in order to select a restaurant to have their lunch. It consists of a Poll application, where *a professional can only vote in a restaurant per day* and *a restaurant can only be chosen once per week*. Taking into consideration it's a POC application many features will be mocked with "fake" data. This will be divided into two parts a **backend** built on top of **NodeJS** and a **frontend** built on **ReactJS**

## Requirements

The application should work on Windows, Linux, and Mac. The following version is what was used during the development, grater versions shouldn't present any problems, but lower versions perhaps might not work as expected.

- Node >= 10.21.0
- NPM >= 6.14.4 or Yarn >= 1.22.4

## Install

In order to install the application we need to extract the contents *restaurant-poll.zip*, downloaded from Github or the application can be cloned directly from the repository by executing the following, on your terminal:

```bash
$ git clone https://github.com/JonatanFlores/restaurant-poll.git
```

After downloading the source code, now is necessary to install the frontend and also the backend dependencies:

In your terminal execute:

```bash
$ cd restaurant-poll/frontend && npm install && cd ..
```

or using yarn

```bash
$ cd restaurant-poll/frontend && yarn && cd ..
```

Installing the backend

```bash
$ cd restaurant-poll/backend && npm install && cd ..
```

or using yarn

```bash
$ cd restaurant-poll/backend && yarn && cd ..
```

## Setup

Now if the steps above were successful, both backend and frontend are available and ready to be used.

> There are some considerations about this step. In order to make it very simple, because this application is not going to be used in production, I did not create config files for development and production, so there won't be any configuration necessary. Also because the application is using fake data and memory and not a real database 

We need to make sure both backend and frontend are running on separated terminals in order to execute the application

#### RUNNING THE BACKEND

```bash
$ cd backend
$ npm run dev:server
```

or using yarn

```bash
$ cd backend
$ yarn dev:server
```


#### RUNNING THE FRONTEND

```bash
$ cd frontend
$ npm start
```

or using yarn

```bash
$ cd frontend
$ yarn start
```

> THE USER HAVE A LOGIN PERIOD OF 5 HOURS, AFTER THAT THEY NEED TO RE-AUTHENTICATE

#### The following is a list of all fake users available

<table>
    <thead>
        <tr>
            <td>Email</td>
            <td>Email</td>
            <td>Password</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>João Pedro</td>
            <td>joaopedro@dbserver.com.br</td>
            <td>123456</td>
        </tr>
        <tr>
            <td>Bruno Silva</td>
            <td>brunosilva@dbserver.com.br</td>
            <td>123456</td>
        </tr>
        <tr>
            <td>Maria Lucia</td>
            <td>marialucia@dbserver.com.br</td>
            <td>123456</td>
        </tr>
        <tr>
            <td>Ana Clara</td>
            <td>anaclara@dbserver.com.br</td>
            <td>123456</td>
        </tr>
    </tbody>
<table>

## Tests

The application provides a set of tests, in order to execute them, you need to access the terminal inside the backend folder and execute the following commands:

```bash
$ npm test
```

or using yarn

```bash
$ yarn test
```

## Considerations

### What is worth highlighting in the implemented code?

The frontend application was built using ReactJS with help of the create-react-app tool.

The system was made using the RESTful model, where it was developed the backend which is responsible for providing an API that can be consumed by any client, no matter if is an internet browser, a mobile device, etc.

On the server-side, the following hierarchy was followed:
- **src**: contém todos os códigos da aplicação
  - **\_\_tests\_\_**: application's tests using the jest and supertest libraries, because a REST API was made were used integration tests.
  - **@types**: this folder is used for the definition of types for the typescript, in this case, were used only to overwrite the Request of the Express JS framework with an object containing the logged-in user's id as well as an instance of the socket.io library.
  - **config**: qualquer configuração que possa ser usada no sistema, como chaves de porta externas etc. Eu não dividi em configurações de desenvolvimento e produção, pois esse sistema não irá para produção.
  - **errors**: this folder is used to store customized errors that are used, at the moment there is only one AppError class that contemplates the application flow.
  - **middlewares**: custom middleware used in express, at the moment there is only middleware to check if the user is authenticated before accessing certain routes and also middleware to