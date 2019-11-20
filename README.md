Project is created for banworks
### Technologies used are:

## Core Technology
`ReactJs, NodeJS, Xero Account API`

## Query Language
`GraphQL`

## Database
`MYSQL`

## UserStories

- As a user, I am able to sync data from erp on demand
- As a user, I am able to see the data sets that are imported from my ERP to my database
- As a user, I am able, sync log request, to get detailed sync process with timeline, so
that I can confirm when my data exported from my erp to database
- As a user, I am able to see Vendors from database, (importe from erp)
- As a user, I am able to download Vendors
- As a user, I am able to see Accounts from database, (importe from erp)
- As a user, I am able to see Accounts

## Architecture Diagram

![Architecture](/diagrams/invoice_module_data_flow_diagram.png)

## Clone repo in your pc

`git clone https://github.com/brijal1987/beanworks-brijalsavaliya.git`

## Open Command Line / Terminal in your system and navigate to the directory with clonned repository.

`cd beanworks-brijalsavaliya`

## Setup Database

`import /beanworks.sql into mysql and setup db settings`

## Setup Configuration Files, Add new file in root `.env` and add below configurations

`DATABASE_NAME=beanworks`

`DATABASE_HOST=localhost`

`DATABASE_PORT=8889`

`DATABASE_USERNAME=**`

`DATABASE_PASSWORD=**`

`PORT=3000`

`ENVIRONMENT="developement"`


If you change in port Please change `constants.js`

`export const API_URL = 'http://localhost:{PORT}';`


Generate Public/Private key, Add Public key in `keys/` and Do Necessary changes for `config/(developement|production)`

`{`

    "appType" : "private",

    "consumerKey": "XXXXX",

    "consumerSecret": "xxx",

    "privateKeyPath": "keys/privatekey.pem"

`}`


## Install all dependencies

`npm install`

## Available Scripts

In the project directory, you can run:

## Server/GraphQL Instance

`node start.js` 


## Client, Open another console and run

`npm start`

`Open Browser and run http://localhost:3001/`

## Tests

`npm run test`
