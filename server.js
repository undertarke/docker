
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static("."));

app.listen(8080);

//  yarn add graphql express-graphql

const { graphqlHTTP } = require("express-graphql");
const schemaGrap = require('./graphql/schema');
const resolverGrap = require('./graphql/resolver');

app.use("/grap", graphqlHTTP({
    schema: schemaGrap,  // nơi để định nghĩa các model bất kỳ để chứa data 
    rootValue: resolverGrap,  // nơi định nghĩa các hàm xử lý data
    graphiql: true // cho phép client truy cập vào giao diện thao tác của graphql
}))