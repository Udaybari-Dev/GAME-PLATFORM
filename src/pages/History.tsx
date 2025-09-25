import React from 'react';
import { Link } from 'react-router-dom';

const History: React.FC = () => {
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Game History</h1>
      <p className="mb-4">No history yet. Play some games to see results here!</p>
      <Link to="/" className="text-blue-500 underline">Back to Library</Link>
    </div>
  );
};

export default History;
