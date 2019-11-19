import { buildSchema } from 'graphql';

const schema = buildSchema(`
type Query {
    accounts: [Account]
    contacts: [Contact]
},
type Contact {
    ContactID: String,
    Name: String,
    AccountNumber: String,
    ContactStatus: String,
    UpdatedDateUTC: String
}
type Account {
    AccountID: String,
    Name: String,
    Code: String,
    Status: String,
    UpdatedDateUTC: String
}
`);

export default schema;