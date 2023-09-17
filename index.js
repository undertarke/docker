// B1: yarn init
// B2: yarn add express dotenv nodemon
// B3: sửa lại file package.json => yarn start, type ="module"
// B4: Setup server node bằng express
// B5: Viết API test thử

import express from 'express';

const app = express();

app.listen(8080)

import { PrismaClient } from '@prisma/client';

const model = new PrismaClient();

app.get("/get-food-2", async (req, res) => {
    // SELECT * FROM user WHERE full_name LIKE
    // .findAll()
    // .findOne()
    // let data = await model.user.findMany({
    //     include: {
    //         order: {
    //             include: {
    //                 food: true
    //             }
    //         }
    //     }
    // }); // => record đầu tiên

    let data = await model.food_type.findMany({
        include: {
            food: true
        }
    });
    res.send(data);
})

app.post("/create-food", async (req, res) => {
    let { user_id } = req.params;
    let { full_name, email, pass_word } = req.body;
    let newData = { full_name, email, pass_word };

    await model.user.create({ data: newData });
    await model.user.update({ data: newData }, { where: { user_id } });
    await model.user.delete({ where: { user_id } });

})

// yarn prisma init
// npx prisma init
// yarn add prisma @prisma/client


// yarn prisma db push => Code first
// yarn prisma db pull => database first
// yarn prisma generate

// yarn => npx




//yarn add graphql express-graphql

app.use(express.json());

import { graphqlHTTP } from 'express-graphql';


import { buildSchema } from 'graphql';

// nơi định nghĩa đối tượng (object), tên hàm cho graphql
const schemaGraphql = buildSchema(`

    type User {
        id: ID
        userName: [String] 
        email: String

        type: UserType
    }

    type Food {
        food_id: ID
        food_name: String
        image: String
        price: Int

        food_type: Food_Type
    }

    type Food_Type {
        type_id: ID
        type_name: String
    }

    type UserType{
        type_id: Int
        type_name: String
    }

    type RootQuery{
        getUser: [Food]
    }

    type RootMutation{
        createUser: String
    }

    schema{
        query: RootQuery
        mutation: RootMutation
    }

`);


// Đưa dữ liệu

const resolverGraphql = {
    getUser: async () => {
        let data = await model.food.findMany({
            include: {
                food_type: true
            }
        });

        console.log(data)
        return data;
    }
    ,
    createUser: () => {

        return "hello world";
    }

}



app.use("/api", graphqlHTTP({
    schema: schemaGraphql, // nơi định nghĩa đối tượng, tên hàm cho graphql
    rootValue: resolverGraphql, // nơi định nghĩa chức năng xử lý cho các hàm để trả dữ liệu về 
    graphiql: true // => tạo giao diện UI
}))