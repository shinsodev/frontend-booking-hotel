// src/pages/ForbiddenPage/ForbiddenPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ForbiddenPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold mb-4">403 - Forbidden</h1>
      <p className="text-lg mb-8">
        You don't have permission to access this page.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
      >
        Go Back to Home
      </Link>
    </div>
  );
};

export default ForbiddenPage;
