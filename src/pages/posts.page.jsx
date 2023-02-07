import React, { Suspense } from 'react';
import {
  Link,
  useLoaderData,
  useSearchParams,
  defer,
  Await,
} from 'react-router-dom';
import { Filter } from '../components/filter.component';

export const Posts = () => {
  const { posts } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const postQuery = searchParams.get('post') || '';
  const latest = searchParams.has('latest');

  return (
    <div>
      <h1>Posts</h1>
      <Filter
        latest={latest}
        setSearchParams={setSearchParams}
        postQuery={postQuery}
      />
      <Link to='add' style={{ marginBottom: '1rem', display: 'block' }}>
        Add new post
      </Link>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Await resolve={posts}>
          {(resolvedPosts) => (
            <ul>
              {resolvedPosts
                .filter(
                  (post) =>
                    post.title
                      .toLocaleLowerCase()
                      .includes(postQuery.toLocaleLowerCase()) &&
                    post.id > (latest ? 80 : 0)
                )
                .map((post) => (
                  <Link to={`${post.id}`} key={post.id}>
                    <li style={{ listStyle: 'none' }}>
                      {post.id + '. ' + post.title}
                    </li>
                  </Link>
                ))}
            </ul>
          )}
        </Await>
      </Suspense>
    </div>
  );
};

async function getPosts() {
  const res = await fetch('http://localhost:3001/posts');
  if (!res.ok)
    throw new Response('', { status: res.status, statusText: 'URL error!' });
  return res.json();
}

export const postsLoader = async () => {
  return defer({
    posts: getPosts(),
  });
};
