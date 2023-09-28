import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
    user: 'postgres',
    host: '138.197.7.205',
    database: 'test',
    password: 'P0rt4lF1rm4$',
    port: 5432,
    keepAlive: true
});

pool.connect(function(err) {
    if (err) {
        console.log(err);
        return;
    }else{
        console.log('conectado correctamente');
        
    }
});

export default pool;
