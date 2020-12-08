import mongoose from 'mongoose';
import 'dotenv/config.js';

const connectDatabase = async() => {
    let dbcon;
    try {
        dbcon = await mongoose.connect(process.env.DATABASE_LOCAL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            withCredentials: true,
        });
    }
    catch(error){
        console.log(error.message);
    }

    console.log(`Connected to mongodb ${dbcon.connection.host}`);
}

export default connectDatabase;