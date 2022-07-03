var admin = require("firebase-admin");

var serviceAccount = require("../service_account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

const animeSnaps = [];
const animeRef = db.collection('animes');
animeRef.get().then(snapshot => {
  snapshot.forEach(doc => {
    const animeDoc = doc.data();
    const title = animeDoc.title;
    db.collection('likes').doc(title)
  .set({
    title: title,
    users: []
  })
  .then(function() {
    console.log("Document successfully written!");
  })
  .catch(function(error) {
    console.error("Error writing document: ", error);
  }
  )
  });
});

// animeTitles.forEach(title => {
//   db.collection('likes').doc(title)
//   .set({
//     title: title,
//     users: []
//   })
//   .then(function() {
//     console.log("Document successfully written!");
//   })
//   .catch(function(error) {
//     console.error("Error writing document: ", error);
//   }
//   );
// });