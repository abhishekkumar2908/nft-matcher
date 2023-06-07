import React, { useState } from 'react';
import axios from 'axios';
import '../assets/style/ImageUploadComponent.css';

function ImageUploadComponent() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('image', file);

    axios
      .post('http://localhost:8080/find/any/similar/image', formData)
      .then((response) => {
        setResult(response.data.message);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container">
      <h2 className="title">Upload an Image</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="imageInput" className="file-label">
            <input type="file" id="imageInput" onChange={handleFileChange} className="file-input" />
            <span className="file-cta">Choose File</span>
          </label>
        </div>
        <button type="submit" className="upload-button">
          Upload
        </button>
      </form>
      <div className="result">{result}</div>

    </div>
  );
}

export default ImageUploadComponent;
