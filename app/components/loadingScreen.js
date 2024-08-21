import React from 'react';
import '../CSS/loadingScreen.css'; // For the spinner and dots animations

const LoadingScreen = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <div className="loading-dots">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
