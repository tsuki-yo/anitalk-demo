import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();

export const likeCount = functions.firestore
  .document('/likes/{id}')
  .onUpdate(async (snapshot) => {
    const data = snapshot.after.data();
    const numberOfLikes = data.users.length;
    const animeId = data.id;
    const animeRef = db.collection('animes').doc(animeId);

    return animeRef.update({
      likeCount: numberOfLikes,
    });
  }
  );

