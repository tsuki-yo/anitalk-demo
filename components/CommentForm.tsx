import { collection, where, addDoc, setDoc, getDocs, doc, query, orderBy, serverTimestamp } from "firebase/firestore";
import { firestore, auth, postToJSON } from '../lib/firebase';
import { UserContext } from '../lib/context';
import { useContext, useState } from 'react';
import kebabCase from 'lodash.kebabcase';

export default function Page({slug, parent=false}) {
  const { username } = useContext(UserContext);
  const [content, setContent] = useState('');

  const isValid = content.length > 3 && content.length < 100;

  const createThread = async (e) => {
    e.preventDefault();
    const uid = auth.currentUser.uid;
    const ref = doc(collection(firestore, 'threads', slug , 'comments'));
    
    const data = {
      content,
      uid,
      id: ref.id,
      username,
      parent: parent,
      createdAt: serverTimestamp(),
      // updatedAt: serverTimestamp(),
    }

    await setDoc(ref, data);
    setContent('');
  }
  return (
    <main>
      <h1>Comment here</h1>
      
      <form onSubmit={createThread}>
        <input
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="content"
        />
        <button type="submit" disabled={!isValid} className="btn-green">
          Create New Comment
        </button>
      </form>
    </main>
  )
}
