import path from 'path'
import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import fileUpload  from 'express-fileupload'

import rutas from './routes'

//require('./config/Association');


const app = express()

//middllewares
app.use(morgan('tiny'));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(express.urlencoded({extended:false}));
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));


//setings
app.set('port', process.env.PORT || 4000 )

//Rutas
app.use('/api', rutas);
/*  app.get('/', (req, res) => {
    res.render('index')
}) */

//Archivos estaticos
//app.use(history());
app.use(express.static(path.join(__dirname ,'/public')));


export default app


/* app.listen(process.env.PORT, () => {
    console.log('Sirviendo en puerto ', process.env.PORT);
}); */