import { collection, where, setDoc, getDocs, doc, query, orderBy, serverTimestamp } from "firebase/firestore";
import { firestore, auth, postToJSON } from '../lib/firebase';
import { UserContext } from '../lib/context';
import { useContext, useState } from 'react';
import kebabCase from 'lodash.kebabcase';

export default function Page({ }) {
  const { username } = useContext(UserContext);
  const [title, setTitle] = useState('');
  const slug = encodeURI(kebabCase(title));

  const isValid = title.length > 3 && title.length < 100;

  const createThread = async (e) => {
    e.preventDefault();
    const uid = auth.currentUser.uid;
    const ref = doc(firestore, 'threads', slug);
    
    const data = {
      title,
      slug,
      uid,
      username,
      createdAt: serverTimestamp(),
      // updatedAt: serverTimestamp(),
    }

    await setDoc(ref, data);
    setTitle('');
  }
  return (
    <>
      <h1>Post here</h1>
      
      <form onSubmit={createThread}>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Title"
        />
        <button type="submit" disabled={!isValid} className="btn-green">
          Create New Thread
        </button>
      </form>
    </>
  )
}