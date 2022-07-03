import { firestore, auth } from '../../lib/firebase';
import { collection, doc, getDoc, getDocs, where, orderBy } from 'firebase/firestore';
import { query as Query } from 'firebase/firestore';
import Link from 'next/link';

export async function getServerSideProps( { query } ) {
  const { username } = query;
  const usernameRef = doc(firestore, 'usernames', username);
  const usernameDoc = (await getDoc(usernameRef)).data();
  const uid = usernameDoc.uid;
  const q = Query(collection(firestore, 'likes'), where('users', 'array-contains', uid));
  const querySnapshot = await getDocs(q);
  const likedTitles = querySnapshot.docs.map(doc => doc.data().title);

  return {
    props: { likedTitles, username },
  }
}

export default function Page({ likedTitles, username }) {

  return (
    <main>
      <h1>{`${username}'s Favorite Animes`}</h1>
      
      <ul>
        <>
        {likedTitles.map(title => (
          <Link key={title} href={`/Animes/${title}`}>
            <li>{title}</li>
          </Link>))}
        </>
      </ul>
    </main>
  )
}