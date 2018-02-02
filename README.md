# GraphQL Server

This repository was built to help me practice GraphQL queries with node/express.

### Here's how to use it:
```
> git clone https://github.com/KameronJohnson/GraphQL-Server
> cd into directory
> npm install
> npm run json:server
> (in another terminal window) npm run dev:server
```
#### Navigate to http://localhost:4000/graphiql

Here you can run mutations via Graphiql IDE.

You can add, edit and delete customers: see schema.js for ideas.

For example, to add a customer to the data.json file try this query:

```
mutation{
  addCustomer(id: "10", name: "Freddie Mercury", email: "FreddieRules@aol.com", age:45){
    name,
    id,
    age
  }
}
```

MIT License.