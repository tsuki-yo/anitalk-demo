var admin = require("firebase-admin");

var serviceAccount = require("../service_account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();
const fs = require('fs');

// const jsonData =  JSON.parse(fs.readFileSync('../animeData.json'));
const jsonData = require('../data/animeData.json');


jsonData.forEach( obj => {
  db.collection('animes').doc(obj.title).set(obj)
  .then(function() {
    console.log("Document successfully written!");
  }
  )
  .catch(function(error) {
    console.error("Error writing document: ", error);
  }
  );
});