import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Product Detail</h1>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Product ID: {id}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Coming soon...</p>
    </div>
  );
};

export default ProductDetail;
