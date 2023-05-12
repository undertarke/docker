// mở terminal yarn init 
// tạo lệnh script trong file package.json để start server
// yarn add express nodemon dotenv
// setup server BE theo Express

const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static("."));

// setup CORS

app.listen(8080);

// yarn add prisma @prisma/client
// yarn prisma init 
// .env chứa biến môi có chuỗi để kết nối CSDL
// schema.prisma => model : chứa các đối tượng (DAO) tương ứng với table trong CSDL

// yarn prisma db pull
// yarn prisma generate

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient(); // tương tự initModel của sequelize

app.get("/get-user", async (req, res) => {

    // SELECT * FROM user
    // model.user.findAll()
    // liên kết relationship (join)
    let data = await prisma.user.findMany({
        include: {
            like_res: {
                include: {
                    restaurant: true
                }
            }
        },

        where: {
            full_name: {
                contains: ""   // WHERE full_name LIKE '%a%'
            }
        }
    }); // list object

    res.send(data);
})

app.post("/create-user", async (req, res) => {

    let { full_name, email, pass_word } = req.body;
    let data = {
        full_name, email, pass_word
    }

    // prisma.$queryRaw("SELECT * FROM user");

    await prisma.user.create({ data });

    let { user_id } = req.params;
    await prisma.user.update({ data: data, where: { user_id } });

    await prisma.user.delete({ where: { user_id } })
})


const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`

    type User {
        user_id: ID
        full_name: String
        email: String
    }

    type Product {
        productId: ID
        productName: String
    }

    type RootQuery{
        getUser: [User]
    }

    type RootMutation{
        createUser(id: Int, name: String): Product
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }

`);

const rootValue = {
    getUser: async () => {
        let data = await prisma.user.findMany(
            {
                include: {
                    like_res: true
                }
            }
        );

        // list object
        return data;
    },

    createUser: ({ id, name }) => {

        return {
            productId: id,
            productName: name
        };
    }

};

app.use("/api", graphqlHTTP({
    schema,   // nơi chứa model của graphql
    rootValue, // nơi truyền data cho các model ở schema
    graphiql: true
}));

// API get-user(getName) => tất cả thuộc của User
// name, email => API get-user-info 
// id , name => 

// cách FE gọi query lấy data từ BE dùng Graphql
// const graphqlQuery = {
//     "operationName": "fetchUser",
//     "query": `query fetchUser { getUser { user_id full_name email } }`,
//     "variables": {}
// };

// const response = axios({
//     url: endpoint,
//     method: 'post',
//     headers: headers,
//     data: graphqlQuery
// });
// response.then().catch()