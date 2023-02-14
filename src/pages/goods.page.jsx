import React, { useState } from 'react';
import {
  useGetGoodsQuery,
  useAddGoodMutation,
  useDeleteGoodMutation,
} from '../redux/goodsApi';

export const Goods = () => {
  const [count, setCount] = useState('');
  const [newGood, setNewGood] = useState('');
  const { data = [], error, isLoading } = useGetGoodsQuery(count);
  const [addGood, { isError }] = useAddGoodMutation();
  const [deleteGood] = useDeleteGoodMutation();

  const handleAddGood = async () => {
    if (newGood) {
      await addGood({ name: newGood }).unwrap();
      setNewGood('');
    }
  };
  const handleDeleteGood = async (id) => {
    await deleteGood(id).unwrap();
  };

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div>
      <div>
        <input
          style={{ color: '#666' }}
          type='text'
          value={newGood}
          onChange={(e) => setNewGood(e.target.value)}
        />
        <button style={{ color: 'black' }} onClick={handleAddGood}>
          ADD
        </button>
        <select
          style={{ color: '#666' }}
          value={count}
          onChange={(e) => setCount(e.target.value)}>
          <option style={{ color: '#666' }} value=''>
            all
          </option>
          <option style={{ color: '#666' }} value='1'>
            1
          </option>
          <option style={{ color: '#666' }} value='2'>
            2
          </option>
          <option style={{ color: '#666' }} value='3'>
            3
          </option>
        </select>
      </div>
      <ul>
        {data.map((item) => (
          <li onClick={() => handleDeleteGood(item.id)} key={item.id}>
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
