import React from "react";
import { useParams } from "react-router-dom";

const UserProfile: React.FC = () => {
  const { id } = useParams();

  return (
    <div className="p-4 rounded-xl shadow-md bg-white dark:bg-gray-800">
      <div className="w-20 h-20 rounded-full mb-4 bg-gray-200 dark:bg-gray-700" />
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">User Profile</h2>
      <p className="text-gray-600 dark:text-gray-300">User ID: {id}</p>
      <p className="mt-2 text-gray-500 dark:text-gray-400">Details coming soon...</p>
    </div>
  );
};

export default UserProfile;
