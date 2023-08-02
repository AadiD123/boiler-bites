import React, { useState } from 'react';

const StarRating = (props) => {
  const [rating, setRating] = useState(0);

  const handleStarClick = async (selectedRating) => {
    setRating(selectedRating);

    try {
      const response = await fetch('http://localhost:4000/api/ratings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dish: props.id, stars: selectedRating }),
      });

      if (response.ok) {
        console.log(`User's rating: ${selectedRating}`);
      } else {
        console.error('Failed to send rating to the server.');
      }
    } catch (error) {
      console.error('Error occurred while sending rating:', error);
    }
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => handleStarClick(star)}
          style={{ cursor: 'pointer', color: star <= rating ? 'gold' : 'gray' }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;