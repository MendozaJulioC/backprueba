const { Pool } = require('pg');

const dblocal = new Pool({
    user: process.env.K_PGUSER,
    host: process.env.K_PGHOST,
    database: process.env.K_PGDATABASE,
    password: process.env.K_PGPASSWORD,
    port: process.env.K_PGPORT,
    // ssl:{
     
    //         rejectUnauthorized: true,
    //         // ca: fs.readFileSync('/path/to/server-certificates/root.crt').toString(),
    //         // key: fs.readFileSync('/path/to/client-key/postgresql.key').toString(),
    //         // cert: fs.readFileSync('/path/to/client-certificates/postgresql.crt').toString(),
          
    // }
})
dblocal.connect().then(()=>console.log('Conexión  DB'));




module.exports = { dblocal };