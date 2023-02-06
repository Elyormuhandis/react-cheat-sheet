import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuthProvider';

export const EditPost = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      <h3>EditPost {useParams().id}</h3>
      <button
        style={{ color: 'black' }}
        type='button'
        onClick={() => signOut(() => navigate('/', { replace: true }))}>
        LOG OUT
      </button>
    </div>
  );
};
