'use client';
import * as React from 'react';
import { useState } from 'react';

interface IStarRatingProps {
  rating: any;
}

const StarRating: React.FunctionComponent<IStarRatingProps> = (props) => {
  const [rating, setRating] = useState(0);
  const handleRating = (rate: any) => {
    setRating(rate);
    props.rating(rate);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <div key={star} className="relative">
            <button
              className={`text-3xl ${star <= rating ? 'text-yellow-300' : 'text-gray-400'}`}
              onClick={() => handleRating(star)}
            >
              ★
            </button>
            <button
              className={`text-3xl absolute left-0 top-0 w-1/2 overflow-hidden ${star - 0.5 <= rating ? 'text-yellow-300' : 'text-gray-400'}`}
              onClick={() => handleRating(star - 0.5)}
            >
              ★
            </button>
          </div>
        ))}
      </div>
      <div className="mt-2 text-lg">Selected Rating: {rating}</div>
    </div>
  );
};

export default StarRating;
