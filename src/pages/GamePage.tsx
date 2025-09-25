import React from 'react';
import { useParams, Link } from 'react-router-dom';

const GamePage: React.FC = () => {
  const { slug } = useParams();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-yellow-50 p-6">
      <h1 className="text-3xl font-bold mb-4">Game: {slug}</h1>
      <p className="mb-4">This is a placeholder for your game component.</p>
      <Link to="/" className="text-blue-500 underline">Back to Library</Link>
    </div>
  );
};

export default GamePage;
