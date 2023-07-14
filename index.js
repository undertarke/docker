// B1: tạo file index.js
// B2: mở terminal chạy lệnh, yarn init
// B3: Cập nhật file package.json 
//      + "type":"module"
//      + "script": { "start":"nodemon index.js" }
// B4: yarn add express dotenv nodemon
// B5: setup như bên dưới

import express from 'express';

const app = express();
app.listen(8080);


import { graphqlHTTP } from 'express-graphql';

import { buildSchema } from 'graphql';

const schemaGraphql = buildSchema(`

    type User {
        user_id: ID
        full_name: String
        email: String
        pass_word: String
    }

    type RootQuery {
        getDemo: String
        getUser: User
        getFood: Int
        getListUser(id: Int, email: String): [User]
        getListNumber: [Int]
    }

    type RootMutation {
        createUser: String
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }

`);

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


const resolver = {
    getDemo: () => { return "Hello" },
    getUser: () => {
        return {
            id: 1, userName: "abc", email: "abc@gmail.com"
        }
    },
    getFood: () => { return 123 },

    getListUser: async ({ id, email }) => {

        let data = await prisma.user.findMany({
            where: {
                user_id: id
            }
        });

        return data;
    },

    getListNumber: () => { return [2, 3, 10] }
}

// localhost:8080/grahql
app.use("/graphql", graphqlHTTP({
    schema: schemaGraphql, // định nghĩa, quản lý các object
    rootValue: resolver, // định nghĩa, quản lý hàm để gán data cho object
    graphiql: true
}))













// yarn prisma generate => làm mới lại model trong thư viện @prisma/client


app.get("/get-food", async (req, res) => {
    // .findAll()
    // SELECT * FROM food WHERE food_name LIKE '%a%'
    // JOIN food , food_type
    let data = await prisma.food.findMany();
    res.send(data);
})

app.post("/create-food/:food_id", async (req, res) => {
    let { food_id } = req.params; // string
    let { food_name, image, price, desc, type_id, color } = req.body;

    let newData = { food_name, image, price, desc, type_id, color };

    await prisma.food.create({ data: newData });
    await prisma.food.update({ data: newData, where: { food_id: Number(food_id) } });

    await prisma.food.createMany({ data: [newData, newData, newData] });

    await prisma.food.delete({ where: { food_id: +food_id } });

    await prisma.$queryRaw("SELECT * FROM food");

    res.send("OK");
})

// yarn prisma db pull
// yarn prisma generate