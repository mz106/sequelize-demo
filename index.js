
// docker run --rm --name master26-mysql -dp 3306:3306 -v mysql-data-master26:/var/lib/mysql 
// -v mysql-config-master26:/etc mysql/mysql-server:latest

require("dotenv").config();

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
});

const Cat = sequelize.define("Cat", {
    name: { type: DataTypes.STRING, allowNull: false }
    },

    {}
); 



const main = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established");
        await Cat.sync({alter: true});
        const cat = Cat.build({name: "jam"});
        await cat.save();
        const cats = await Cat.findAll();
        console.log(cats);

        const jam = await Cat.findAll({
            where: {
                name: "jam"
            }
        });
        console.log(jam)

        await Cat.update({name: "horatio"}, {
            where: {
                name: "bob"
            }
        });

        await Cat.destroy({
            where: {
                name: "jam"
            }
        });

    } catch (error) {
        console.log("Connection failed");
        console.log(error);
    }

    await sequelize.close();
    process.exit();
};
 
main();