import Thread from '../../components/Thread';
import { doc, getDoc, query, collection, getDocs, where, orderBy } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firestore, auth, postToJSON } from '../../lib/firebase';
import CommentForm from '../../components/CommentForm';

export async function getServerSideProps( {query} ) {
  const { slug, username } = query;
  const commentsRef = collection(firestore, 'threads', slug, 'comments');
  const commentsSnap = await getDocs(commentsRef);
  const commentsDocs = commentsSnap.docs.map(comment => postToJSON(comment));
  return {
    props: { commentsDocs, slug },
  }
}

export default function Page({commentsDocs, slug}) {
  const title = slug.split('-').join(' ');
  const commentsRef = collection(firestore, 'threads', slug, 'comments');
  const [RealTimeComment] = useCollectionData(commentsRef);
  const comments = RealTimeComment || commentsDocs;
  return (
    <main>
      <CommentForm  slug={slug} />
      <h2>{title}</h2>
      <Thread slug={slug} commentsDocs={comments} />

    </main>
  )
}