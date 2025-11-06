'use client';

import { useState } from 'react';

const colors = [
  { name: 'Red', hex: '#FF0000' },
  { name: 'Blue', hex: '#0000FF' },
  { name: 'Green', hex: '#00FF00' },
  { name: 'Yellow', hex: '#FFFF00' },
  { name: 'Purple', hex: '#800080' },
  { name: 'Primary', hex: '#4F46E5' },
];

export default function Home() {
  const [votes, setVotes] = useState<Record<string, number>>({});

  const handleVote = (colorName: string) => {
    setVotes(prev => ({ ...prev, [colorName]: (prev[colorName] || 0) + 1 }));
  };

  const totalVotes = Object.values(votes).reduce((sum, count) => sum + count, 0);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Color Voting System</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {colors.map(color => (
            <div key={color.name} className="bg-white rounded-lg shadow-md p-6 text-center">
              <div
                className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-gray-300"
                style={{ backgroundColor: color.hex }}
              ></div>
              <h2 className="text-xl font-semibold mb-2">{color.name}</h2>
              <p className="text-gray-600 mb-4">Votes: {votes[color.name] || 0}</p>
              <button
                onClick={() => handleVote(color.name)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Vote
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Results</h2>
          <p className="text-lg mb-4">Total Votes: {totalVotes}</p>
          <div className="space-y-2">
            {colors.map(color => {
              const count = votes[color.name] || 0;
              const percentage = totalVotes > 0 ? (count / totalVotes * 100).toFixed(1) : '0';
              return (
                <div key={color.name} className="flex items-center">
                  <span className="w-20 text-left">{color.name}:</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-4 mx-2">
                    <div
                      className="h-4 rounded-full"
                      style={{ backgroundColor: color.hex, width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="w-16 text-right">{count} ({percentage}%)</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
