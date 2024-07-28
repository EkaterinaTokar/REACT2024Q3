import React, { useState } from 'react';

const ErrorButton: React.FC = () => {
  const [error, setError] = useState(false);

  const handleErrorClick = () => {
    setError(true);
  };

  if (error) {
    throw new Error('Error');
  }
  return (
    <div>
      <button onClick={handleErrorClick}>Throw Error</button>
    </div>
  );
};

export default ErrorButton;
