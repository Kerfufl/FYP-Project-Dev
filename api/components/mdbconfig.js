var mdb = require('mariadb');

mdb = mdb.createConnection(
    {
        user:"root",
        host: "localhost",
        database: "fyp_db"
    }
)
module.exports = mdb
//export default maridb