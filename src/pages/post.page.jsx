import React from 'react';
import { Suspense } from 'react';
import {
  Await,
  Link,
  defer,
  useAsyncValue,
  useLoaderData,
  useNavigate,
} from 'react-router-dom';

export const Post = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const { post, comments, id } = useLoaderData();
  return (
    <div>
      <button
        style={{
          display: 'block',
          backgroundColor: '#404050',
          border: 'none',
          color: 'white',
          padding: '0.5rem 1rem',
          marginBottom: '1rem',
        }}
        onClick={goBack}>
        Back
      </button>
      <Link
        to={`/posts/${id}/edit`}
        style={{
          display: 'block',
          marginBottom: '2rem',
          fontSize: 'large',
          fontWeight: 'bold',
          color: 'lightgreen',
        }}>
        Edit this post
      </Link>
      <Suspense fallback={<h3>Loading post...</h3>}>
        <Await resolve={post}>
          <AsyncPost />
        </Await>
      </Suspense>

      <Suspense fallback={<h3>Loading comments...</h3>}>
        <Await resolve={comments}>
          <AsyncComments />
        </Await>
      </Suspense>
    </div>
  );
};

const AsyncPost = () => {
  const post = useAsyncValue();
  return (
    <>
      <h1 style={{ marginBottom: '1rem' }}>{post?.title}</h1>
      <p style={{ marginBottom: '1rem' }}>{post?.body}</p>
    </>
  );
};
const AsyncComments = () => {
  const comments = useAsyncValue();
  return (
    <>
      <h2>Comments</h2>
      {comments?.map((comment) => (
        <div key={comment.id}>
          <h3 style={{ marginBottom: '1rem', color: 'brown' }}>
            Comment name: {comment?.name}
          </h3>
          <p style={{ marginBottom: '1rem', color: 'green' }}>
            Email: {comment?.email}
          </p>
          <p style={{ marginBottom: '1rem', color: 'yellow' }}>
            Comment: {comment?.body}
          </p>
        </div>
      ))}
    </>
  );
};
async function getPost(id) {
  return await fetch(`http://localhost:3001/posts/${id}`).then((response) =>
    response.json()
  );
}
async function getComments(id) {
  return await fetch(`http://localhost:3001/comments?postId=${id}`).then(
    (response) => response.json()
  );
}
export const postLoader = async ({ params }) => {
  const id = params.id;
  return {
    post: await getPost(id),
    comments: await getComments(id),
    id,
  };
};
