import React, { useState } from 'react';

export const Filter = ({ setSearchParams, postQuery, latest }) => {
  const [searchValue, setSearchValue] = useState(postQuery);
  const [searchLatest, setsearchLatest] = useState(latest);
  const submitHandler = (e) => {
    e.preventDefault();
    const params = {};
    if (searchValue.length) params.post = searchValue;
    if (searchLatest) params.latest = searchLatest;
    setSearchParams(params);
  };

  return (
    <form
      onSubmit={(e) => submitHandler(e)}
      autoComplete='off'
      style={{ marginBottom: '1rem' }}>
      <input
        style={{ color: 'black' }}
        type='search'
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
      />
      <label style={{ padding: '0 1rem' }}>
        <input
          type='checkbox'
          checked={searchLatest}
          onChange={(e) => {
            setsearchLatest(e.target.checked);
          }}
        />
        latest 20
      </label>
      <input style={{ color: 'black' }} type='submit' value='Search' />
    </form>
  );
};
