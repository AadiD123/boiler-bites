const mysql = require("mysql2");

const pool = mysql.createPool({
    host: "boilerbites-1.cjmepwltgjhe.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "purduepete"
}).promise();

async function getDishes() {
    const [rows, fields] = await pool.execute("SELECT * FROM boilerbites.dishes");
    return rows;
}

const dishes = await getDishes();
console.log(dishes);