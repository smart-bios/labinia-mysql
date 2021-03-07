import dotenv from 'dotenv'
dotenv.config()
import app from './server'
import database from './database'

app.listen(app.get('port'), async() => {
  
  console.log('Sirviendo en puerto ', app.get('port'));
  
  database.sync({force: false}).then( ()=> {
    console.log('Connection has been established successfully.');
  
  }).catch (error => {
    console.error('Unable to connect to the database:', error);

  }) 
          
});