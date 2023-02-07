import React from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

export const ErrorPage = () => {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>{error.status}</h1>
        <h3>{error.statusText}</h3>
      </div>
    );
  }
  //   throw error;
  return <div>Someting goes wrong!</div>;
};
