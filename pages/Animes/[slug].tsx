import { collection, where, getDocs, doc, onSnapshot, getDoc, increment, setDoc, updateDoc, query, arrayUnion, arrayRemove } from "firebase/firestore";
import { firestore, auth } from '../../lib/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import AnimeDescription from "../../components/AnimeDescription";
import { useDocumentData } from "react-firebase-hooks/firestore"
import { useState } from "react";

export async function getStaticProps( {params} ) {
 
  const { slug } = params;
  const animeRef = doc(firestore, 'animes', slug);
  const querySnapshot = await getDoc(animeRef);
  const animeDoc = querySnapshot.data();

  return {
    props: { animeDoc },
    revalidate: 100,
  };
}

export async function getStaticPaths() {
  const animeRef = collection(firestore, 'animes');
  const animeDocSnaps = await getDocs(animeRef);
  const paths = animeDocSnaps.docs.map(doc => {
    const { title } = doc.data();
    return {
      params: { slug: title },
    }
  });
  return {
    paths,
    fallback: 'blocking',
  };
}

export default function Page({ animeDoc }) {

  const likeRef = doc(firestore, 'likes', animeDoc.title);
  
  const [uid, setUid] = useState(null);
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUid(user.uid);
    }
  });

  const [liked, setLiked] = useState(null);
  const unsubscribe = onSnapshot(likeRef, (snapshot) => {
    const like = snapshot.data();
    setLiked(like.users.includes(uid));
  });

  const turnTrue = async () => {
    await setDoc(likeRef, { title: animeDoc.title, users: arrayUnion(uid)},{merge: true});
  };

  const turnFalse = async () => {
    await setDoc(likeRef, { title: animeDoc.title, users: arrayRemove(uid)},{merge: true});
  }
  
  return (
    <main>
      <>
      {uid  && (liked ? <button onClick={turnFalse}>liked</button> : <button onClick={turnTrue}>like</button>)}
      
      <AnimeDescription animeDoc={animeDoc} />
      </>
    </main>
  )
}
