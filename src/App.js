import React from 'react';
import ImageUploadComponent from './nftMatcher/ImageUploadComponent';
import HeaderComponent from './nftMatcher/navbar/HeaderComponent';

const App = () => {
  return (
    <div className="App">
      <HeaderComponent />
      <ImageUploadComponent />
    </div>
  );
};

export default App;
