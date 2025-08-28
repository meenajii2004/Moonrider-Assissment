import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-3xl font-semibold mb-2">Unauthorized</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">You do not have permission to view this page.</p>
      <Link to="/" className="text-primary-600 hover:underline">Go back home</Link>
    </div>
  );
};

export default Unauthorized;
