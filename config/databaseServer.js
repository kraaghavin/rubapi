import mongoose from 'mongoose';
const uri = 'mongodb+srv://kraaghavin:NJ6FZLmrbmtQ8E5S@cluster0.nqjkrmx.mongodb.net/test-vercel'

function connectDB() {
  // Connect to the MongoDB database
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log('Connected to the database!');
    })
    .catch((error) => {
      console.error(error);
    });
}

// const connectDB = async () => {
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
// }

export default connectDB;
