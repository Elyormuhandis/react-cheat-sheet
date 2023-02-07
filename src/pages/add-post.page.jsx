import React from 'react';
import { Form, redirect, useNavigate, useNavigation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuthProvider';

export const AddPost = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const navigation = useNavigation();

  return (
    <>
      <button
        style={{ color: 'black' }}
        type='button'
        onClick={() => signOut(() => navigate('/', { replace: true }))}>
        LOG OUT
      </button>
      <Form
        action='/posts/add'
        method='post'
        style={{ display: 'flex', flexDirection: 'column' }}>
        <label>
          Title:
          <input type='text' name='title' />
        </label>
        <label>
          Body:
          <input type='text' name='body' />
        </label>
        <input type='hidden' name='userId' value='1' />
        <input
          type='submit'
          value='Add post'
          disabled={navigation.state === 'submitting'}
          style={{ color: 'black', width: '10rem' }}
        />
      </Form>
    </>
  );
};

const createPost = async ({ title, body, userId, id }) => {
  const res = await fetch('http://localhost:3001/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title,
      body,
      userId,
      id,
    }),
  }).then((res) => res.json());
  return res;
};

export const createPostAction = async ({ request }) => {
  const formData = await request.formData();
  const newPost = {
    title: formData.get('title'),
    body: formData.get('body'),
    userId: formData.get('userId'),
    id: Date.now().toString(),
  };
  const post = await createPost(newPost);
  return redirect('/posts/' + post.id);
};
