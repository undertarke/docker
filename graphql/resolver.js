
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const resolverGrap = {
    getUser: (argu) => {
        return [{
            userId: 1,
            userName: "a",
            email: "a@gmail.com"
        }]
    },

    getFood: () => {

        let data = prisma.food.findMany();

        return data;
    },

    createUser: () => {
        return 123;
    }
};

module.exports = resolverGrap;