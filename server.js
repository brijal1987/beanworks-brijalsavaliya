import express from 'express';
import cors from 'cors';
import { loadConfig } from './config/loadconfig';
import XeroConnection from './xeroclient/XeroConnection';
import express_graphql from 'express-graphql';
var routes = require('./routes.js');
import schema from './src/api/schema';
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT;
const environment = process.env.ENVIRONMENT;
const xeroConfig = loadConfig(environment);

const xero = new XeroConnection(xeroConfig);

var root = {
  accounts: async () => {
    const { Accounts } = await xero.client.accounts.get();
    return Accounts;
  },
  contacts: async () => {
    const { Contacts } = await xero.client.contacts.get();
    return Contacts;
  }
};

const app = express();
app.use(cors())
app.use('/', routes);

app.use('/graphql', express_graphql({
  schema: schema,
  rootValue: root,
  graphiql: true
}));
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));

app.listen(port, () => console.log(`Node Server Listening on port ${port}`));