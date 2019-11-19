Project is created for banworks
Technologies used are:

### Core Technology
`ReactJs, NodeJS, Xero Account API`

### Query Language
`GraphQL`

### Database
`MYSQL`


### Clone repo in your pc

`git clone https://github.com/brijal1987/beanworks-brijalsavaliya.git`


`cd beanworks-brijalsavaliya`

### Setup Configuration Files

`DATABASE_NAME=beanworks`

`DATABASE_HOST=localhost`

`DATABASE_PORT=8889`

`DATABASE_USERNAME=**`

`DATABASE_PASSWORD=**`

`PORT=3000`

`ENVIRONMENT="developement"`

If you change in port Please change `constats.js`

`export const API_URL = 'http://localhost:{PORT}';`


Generate Public/Private key, Add Public key in `keys/` and Do Necessary changes for `config/(developement|production)`

`{`

    `"appType" : "private",`

    `"consumerKey": "XXXXX",`

    `"consumerSecret": "xxx",`

    `"privateKeyPath": "keys/privatekey.pem"`

`}`


### Install all dependencies

`npm install`

## Available Scripts

In the project directory, you can run:

### Server/GraphQL Instance

`node start.js`

### Client

`npm start`

### Tests

`npm run test`
