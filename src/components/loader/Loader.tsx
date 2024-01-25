import React from 'react';
import './Loader.css';

const Loader: React.FC = () => {
  return (
    <div className="loader-overlay">
      <div className="pokeball-loader"></div>
    </div>
  );
};

export default Loader;
