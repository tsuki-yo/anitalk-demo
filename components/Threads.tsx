import Link from 'next/link';
// import toast from 'react-hot-toast';

export default function Page({docs}) {

  return (
    <>
      <h1>Posts</h1>
      <ul>
        {docs.map(doc => (
        <li key={doc.id}>
          <Link href={`/${doc.username}/${doc.slug}`}>
            <a>{doc.title}</a>
          </Link>
        </li> 
        ))}
      </ul>
    </>
  )
}
