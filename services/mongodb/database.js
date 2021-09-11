import mongoose from 'mongoose';
import config from 'config';

const URI = `mongodb://${config.get('dbConfig.host')}:${config.get('dbConfig.port')}/${config.get(
   'dbConfig.dbName'
)}`;

export async function connectToDB() {
   try {
      const db = await mongoose
         .connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
         })
      console.log(`> mongodb is connected on ${db.connection.host}`);
   } catch (error) {
      console.log('>> Error connecting to database'); 
      process.exit(-1);
   }
}

export async function closeDB() {
   await mongoose.disconnect(); 
}

export async function deleteDB() {
   try {
      if (config.util.getEnv('NODE_ENV') === 'production') {
         console.log('Are you sure? (yes/no)');
         process.on('data', async chunk => {
            /yes | y/.test(String(chunk)) && await kill()
         }) 
      } else {
         await kill()
      }
   } catch (error) {
      console.warn('Error deleting the database'); 
   }
}

async function kill() {
   await mongoose.connection.dropDatabase()
}