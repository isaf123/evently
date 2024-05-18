import React from 'react';

const unauthorized = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-3xl font-bold">Access Denied</h1>
      <p>You do not have permission to view this page.</p>
    </div>
  );
};

export default unauthorized;
