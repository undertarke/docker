// B1: yarn init
// B2: yarn add express dotenv nodemon
// B3: vào config yarn start ở file package.json
// B4: Import và cài đặt host bằng express và cài các middleware tương ứng

const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static("."));

app.listen(8080);


// yarn add prisma @prisma/client
// yarn prisma init => tự động tạo cấu trúc thư mục của prisma

// Code first => yarn prisma db push
// Database first => yarn prisma db pull 
// reset model trong file schema => yarn prisma generate

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// R
app.get("/get-food", async (req, res) => {

    let { id } = req.params;

    //  food_name LIKE '%a%'
    let data = await prisma.food.findMany({
        where: {
            food_name: {
                contains: "a"
            }
        }
    })

    // => sequelize model.food.findAll()

    res.send(data);
})

app.post("/create-food", async (req, res) => {
    let { food_name, image, price, desc, type_id } = req.body;

    let newData = { food_name, image, price, desc, type_id };

    await prisma.food.create({ data: newData });

    res.send("food created")

});

app.put("/update-food/:id", async (req, res) => {
    let { id } = req.params;
    let { food_name, image, price, desc, type_id } = req.body;

    let newData = { food_name, image, price, desc, type_id };

    await prisma.food.update({
        data: newData,
        where: {
            food_id: Number(id)
        }
    });

    res.send("food updated")

});

app.delete("/delete-food/:id", async (req, res) => {
    let { id } = req.params;

    await prisma.food.delete({
        where: {
            food_id: Number(id)
        }
    });

    res.send("food deleted")

});

app.get("/get-relation",  (req, res) => {

    // relation => include
    let data =  prisma.user.findMany();

    res.send(data);
})
