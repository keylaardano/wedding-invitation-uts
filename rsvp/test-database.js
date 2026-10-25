
const db = require("./database");

async function testConnection() {
    try {
        const connection = await db.getConnection();

        console.log("Koneksi database berhasil!");

        connection.release();
        await db.end();
    } catch (error) {
        console.error("Koneksi database gagal:", error.message);
    }
}

testConnection();
