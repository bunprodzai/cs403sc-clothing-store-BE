const mongoose = require('mongoose');
const MONGO_URL = process.env.MONGO_URL;

// // mongoose.set('debug', true);
// // mongoose.connection.on('error', console.error);
// // mongoose.connection.on('disconnected', () => console.log('MongoDB disconnected'));
// // mongoose.connection.on('connected', () => console.log('MongoDB connected'));

// module.exports.connect = async () => {
//   try {
//     await mongoose.connect(MONGO_URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       maxPoolSize: 10,
//       serverSelectionTimeoutMS: 10000,
//       socketTimeoutMS: 45000,
//     });
//     console.log("Connect susccess");
//   } catch (error) {
//     console.log("Connect failed");
//   }
// }

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

module.exports.connect = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URI, {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    }).then((mongoose) => {
      console.log('✅ MongoDB connected');
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

