import React from 'react';
import {
  Form,
  redirect,
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import { useAuth } from '../hooks/useAuthProvider';

export const EditPost = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const { post } = useLoaderData();
  const data = useActionData();
  return (
    <div>
      <button
        style={{ color: 'black' }}
        type='button'
        onClick={() => signOut(() => navigate('/', { replace: true }))}>
        LOG OUT
      </button>
      <h3>EditPost {post.id}</h3>
      {data?.message ? <h3>{data?.message}</h3> : ''}
      <Form
        action={`/posts/${post.id}/edit`}
        method='put'
        style={{ display: 'flex', flexDirection: 'column' }}>
        <label>
          Title:
          <input type='text' name='title' defaultValue={post.title} />
        </label>
        <label>
          Body:
          <input type='text' name='body' defaultValue={post.body} />
        </label>
        <input type='hidden' name='id' value={post.id} />
        <input type='hidden' name='userId' value={post.userId} />
        <input
          type='submit'
          value='Update post'
          disabled={navigation.state === 'submitting'}
          style={{ color: 'black', width: '10rem' }}
        />
      </Form>
    </div>
  );
};

const updatePost = async ({ title, body, userId, id }) => {
  return await fetch(`http://localhost:3001/posts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title,
      body,
      userId,
      id,
    }),
  }).then((res) => res.json());
};

export const updatePostAction = async ({ request }) => {
  const formData = await request.formData();
  if (!formData.get('title') || !formData.get('body')) {
    return { message: 'All field are required' };
  }
  const newPost = {
    title: formData.get('title'),
    body: formData.get('body'),
    userId: formData.get('userId'),
    id: formData.get('id'),
  };
  const updatedPost = await updatePost(newPost);
  // return redirect('/posts/' + updatedPost.id);
  return { message: `Post ${updatedPost.id} was successfully updated` };
};
