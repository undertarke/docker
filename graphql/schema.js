const { buildSchema } = require('graphql');

const schemaGrap = buildSchema(`

    type User {
        userId: ID
        userName: String
        email: String
    }

    type Food {
        food_id:   ID        
        food_name: String   
        image:     String  
        price:     Int
        desc:      String   
        type_id:   Int
     
    }

    type Food_Type {
        type_id: ID
        type_name: String
    }

    type RootQuery{
        getUser: [User]
        getFood: [Food]
    }

    type RootMutation{
        createUser: String
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }

`);


module.exports = schemaGrap;