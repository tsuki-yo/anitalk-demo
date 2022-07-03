import { collection, doc, getDocs } from 'firebase/firestore';
import { firestore } from  '../../lib/firebase';
import Link from 'next/link';
// import { postToJSON } from '../../lib/firebase';

export async function getStaticProps(context) {
  const animeRefs = collection(firestore, 'animes');
  const animeDocSnaps = await getDocs(animeRefs);
  const animeDocs = animeDocSnaps.docs.map(doc => doc.data());

  return {
    props: { animeDocs },
  };
}

export default function Page({ animeDocs }) {

  function listOneSeason(season) {
    return (
      <ul className='collapsible'>
        {animeDocs.filter(anime => anime.season == season).map(anime => (
          <Link key={anime.title} href={`/Animes/${anime.title}`}>
            <li>{anime.title}</li>
          </Link>
        ))}
      </ul>
    )
  }

  return (
    <main>
      <h1>Anime Titles 2022</h1>
      <h2>春アニメ</h2>
      {listOneSeason('spring')}
      <h2>夏アニメ</h2>
      {listOneSeason('summer')}
      <h2>秋アニメ</h2>
      {listOneSeason('fall')}
      <h2>冬アニメ</h2>
      {listOneSeason('winter')}
    </main>
  )
}