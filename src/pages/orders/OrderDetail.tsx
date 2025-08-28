import React from 'react';
import { useParams } from 'react-router-dom';

const OrderDetail: React.FC = () => {
  const { id } = useParams();
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Order Detail</h1>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Order ID: {id}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Coming soon...</p>
    </div>
  );
};

export default OrderDetail;
