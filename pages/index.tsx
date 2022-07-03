import { collection, where, setDoc, getDocs, doc, query, orderBy, serverTimestamp } from "firebase/firestore";
import { firestore, auth, postToJSON } from '../lib/firebase';
import ThreadForm from '../components/Threads';
import PostForm from '../components/ThreadForm';
import { useCollectionData } from "react-firebase-hooks/firestore";

export async function getServerSideProps() {

  //Thread preparation
  const ref = collection(firestore, 'threads');
  const Q = query(ref, orderBy('createdAt', 'desc'));
  const threadQuerySnapshot = await getDocs(Q);
  const threadDocs = threadQuerySnapshot.docs.map(doc => postToJSON(doc));
  return {
    props: {　threadDocs },
  };
}

export default function Home({ threadDocs }) {
  const threadRef = collection(firestore, 'threads');
  const Q = query(threadRef, orderBy('createdAt', 'desc'));
  const [snapshot] = useCollectionData(Q); 
  const threads = snapshot || threadDocs;

  return (
    <main>
      <PostForm />
      <ThreadForm docs={threads}/>
    </main>
  )
}
