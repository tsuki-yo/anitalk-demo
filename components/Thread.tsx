import { firestore } from '../lib/firebase';
import { doc, getDoc, collection, getDocs, where, query } from 'firebase/firestore';
import CommentForm from '../components/CommentForm';

export default function Page({ slug, commentsDocs }) {

  const topLevelComments = commentsDocs.filter(comment => comment.parent == false);

function Comment({ comment }) {
    const childlenComments = 
      commentsDocs
        .filter(commentDoc => commentDoc.parent == comment.id)
        .sort((a, b) => a.createdAt - b.createdAt)
        .reverse();
    const nestedComments = (childlenComments || []).map(commentDoc => {
      return (
        <Comment key={comment.id} comment={commentDoc} />
      )
    });
  
    return (
      <div style={{"marginLeft": "25px", "marginTop": "10px"}}>
        <div className='comment'>
          {comment.username}
          <br />
          {comment.content}
          <CommentForm slug={slug} parent={comment.id}/>
        </div>
        {nestedComments}
      </div>
    )
  }

  return (
    <main>
      {topLevelComments
        .sort((a, b) => a.createdAt - b.createdAt)
        .reverse()
        .map(comment => {
          return (
          <Comment key={comment.id} comment={comment} />
          )
        })
      }
    </main>
  )
}