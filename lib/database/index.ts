// Because this is a serverless application, we need to manage dbconnection efficiently
// we are going to be using server actons.
// each server action would be calling connectDb(). and if we are not caching the connection, it
// would be inefficient. if the connection is still open, we use it else we create a new one

import mongoose from 'mongoose'
console.log('trying to connect to db')
const MONGODB_URI = process.env.MONGODB_URI;

// Lets set up our cache connection to mongoose. 
let cached = (global as any).mongoose || { conn: null, promise: null }; 
// global as any is a typescript referring to the global type of mongoose.

// Lets create the function that connects with the database
export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  // check if we don't have a mongoDb uri
  if(!MONGODB_URI) throw new Error('MONGODB_URI is missing');

  //if we have a cache connnection, use it, else make a connection
  cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
    dbName: 'GoEvent',
    bufferCommands: false,
  }) //this is a cache.promise we created.


  //make the cache connection, which would call the cache.promise
  cached.conn = await cached.promise; 

  //finally return the catch connection
  return cached.conn;
}

