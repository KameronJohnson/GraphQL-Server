const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

//Hardcoded data for now (JSON later)
const customers = [
    {id: 1, name:'Daddy Jones', email:'DJones@aol.com', age: 35},
    {id: 2, name:'Willow Daughtry', email:'booboobear@aol.com', age: 32},
    {id: 3, name:'Jack Saks', email:'jsaks@aol.com', age: 25}
]

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
                for(let i = 0; i < customers.length; i++){
                    if(customers[i].id == args.id){ //args is the customer you're looking for in query
                        return customers[i];
                    }
                }
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
});