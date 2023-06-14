import React from 'react';
import ImageUploadComponent from './components/ImageUploadComponent';
import HeaderComponent from './components/navbar/HeaderComponent';

const App = () => {
  return (
    <div className="App">
      <HeaderComponent />
      <ImageUploadComponent />
    </div>
  );
};

export default App;
