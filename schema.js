const axios = require('axios');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

//Hardcoded data for now (JSON later)
// const customers = [
//     {id: 1, name:'Daddy Jones', email:'DJones@aol.com', age: 35},
//     {id: 2, name:'Willow Daughtry', email:'booboobear@aol.com', age: 32},
//     {id: 3, name:'Jack Saks', email:'jsaks@aol.com', age: 25}
// ]

const CustomerType = new GraphQLObjectType({
    name: 'Customer',
    fields:() => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        age: {type: GraphQLInt}
    })
});

//Root Query, basline for all other queries and object types
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    //always gotta have a name & fields
    fields: {
        customer: {
            type: CustomerType,
            args: {
                id: {type: GraphQLString}
            },
            resolve(parentValue, args){
                /* //for hardcoded customers
                for(let i = 0; i < customers.length; i++){
                    if(customers[i].id == args.id){ //args is the customer you're looking for in query
                        return customers[i];
                    }
                }
                */
                return axios.get('http://localhost:3000/customers/'+ args.id)
                    .then(res => res.data); //returned as a data object
            }
        },
        customers: {
            type: new GraphQLList(CustomerType),
            resolve(parentValue, args){
                return axios.get('http://localhost:3000/customers/')
                    .then(res => res.data);
            }
        }
    }
});

//Mutations
const mutation = new GraphQLObjectType({
    name: 'Mutations',
    fields: {
        addCustomer: {
            type: CustomerType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)}, //wrapping in GraphQLNonNull makes it required.
                email: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)},
            },
            resolve(parentValue, args){
                return axios.post('http://localhost:3000/customers/', {
                    name: args.name,
                    email: args.email,
                    age: args.age
                })
                .then(res => res.data);
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
});