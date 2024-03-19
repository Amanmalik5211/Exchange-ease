// const { MongoClient } = require('mongodb');
// const uri = 'mongodb+srv://amanm85:amanm85@cluster0.chkzz6a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
// const dbName = 'Exchange-Ease';
// async function connectAndSearch() {
//     const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//     try {
//         await client.connect();
//         console.log("Connected successfully to server");
//         const db = client.db(dbName);
//         const collection = db.collection('products');
//         const searchTag = ['bike',"car",'Mobile','home','beg','Phone','bed'];
//         const result = await collection.find({ tags: searchTag }).toArray();
//         console.log(result);
//     } catch (err) {
//         console.error(err);
//     } finally {
//         client.close();
//     }
// }
// connectAndSearch();
