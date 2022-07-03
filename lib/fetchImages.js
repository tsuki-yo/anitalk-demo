var admin = require("firebase-admin");

var serviceAccount = require("../service_account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();
const fs = require('fs');
const fetch = require('node-fetch');

const animeDocs = [];
db.collection('animes').get().then(snapshot => {
  snapshot.forEach(doc => {
    const animeDoc = doc.data();
    animeDocs.push(animeDoc);
  });
  for (const doc of animeDocs) {
    fetch(doc.imageUrl)
      .then(res => 
        res.body.pipe(fs.createWriteStream(`public/${doc.title}.jpg`))
      ).catch(err => console.log(err));
  }
  console.log(`done: ${animeDocs.length}`);
});
