import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { UserContext } from '../lib/context';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';

export default function Navbar() {

  const { user, username } = useContext(UserContext);

  const router = useRouter();

  const signOutNow = () => {
    signOut(auth);
    router.reload();
  }

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/">
            <button className="btn-logo">Anitalk</button>
          </Link>
        </li>

        <li>
          <Link href="/Animes">
            <button className="btn-animes">Animes</button>
          </Link>
        </li>

        {/* user is signed-in and has username */}
        {username && (
          <>
          <li className="push-left">
            <button onClick={signOutNow}>Sign Out</button>
          </li>
          
          <li>
            <Link href={`/${username}`}>
              <img src={user?.photoURL || '/hacker.png'}/>
            </Link>
          </li>
          </>
        )}

        {/* user is not signed-in */}
        {!username && (
          <li>
            <Link href="/enter">
              <button className="btn-enter">Enter</button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  )
}