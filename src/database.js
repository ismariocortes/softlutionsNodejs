// Módulo Mongoose
const mongoose =  require('mongoose');

// URI para la conexión a la base de datos
const MONGODB_URI = 'mongodb+srv://mongoUser:tpW5LmJbN283EzzE@cluster0.bx0cv.mongodb.net/softlutions?retryWrites=true&w=majority';

// Conexión a la base de datos 
mongoose.connect(MONGODB_URI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true 
})
.then(db => console.log("base de datos conectada a : ", db.connection.host ))
.catch(err => console.error(err)); 