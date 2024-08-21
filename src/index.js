require('dotenv').config();
const app = require('./app');
const morgan = require('morgan');

app.use(morgan('dev'));

app.use(require('./routes/index.routes'));

const port = process.env.PORT || 9001;

async function main()
{
    app.listen(process.env.PORT,()=>
        { 
            console.log(`Servidor activo EN EL PUERTO ${process.env.PORT}`);

        })
}
main();