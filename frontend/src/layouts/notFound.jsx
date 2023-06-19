import React from 'react';
import 'layouts/style/notFound.css';

function NotFoundPage() {
  return (
    <div className="not-found-page">
      <h1 className="not-found-page__title">404 Not Found</h1>
      <p className="not-found-page__message">
        The page you are looking for does not exist.
      </p>
    </div>
  );
}

export default NotFoundPage;
