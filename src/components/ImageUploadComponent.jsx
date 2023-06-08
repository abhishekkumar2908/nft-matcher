import React, { useState } from 'react';
import '../assets/style/ImageUploadComponent.css';
import { myAxios } from '../services/helper';

function ImageUploadComponent() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [similarNFTs, setSimilarNFTs] = useState([]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile.name);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('image', file);

    myAxios
      .post('/find/any/similar/image', formData)
      .then((response) => {
        setSimilarNFTs(response.data); // Assuming the response contains the list of similar NFTs
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container">
      <h2 className="title">Upload an Image to search similar image</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="imageInput" className="file-label">
            <input type="file" id="imageInput" onChange={handleFileChange} className="file-input" />
            <span className="file-cta">{fileName ? fileName : 'Choose File'}</span>
          </label>
        </div>
        <button type="submit" className="upload-button">
          Check
        </button>
      </form>
      <div className="result">
        {similarNFTs.length > 0 ? (
          <ul>
            {similarNFTs.map((nft) => (
              <li key={nft.id}>
                <p>NFT ID: {nft.nftId}</p>
                <p>Image URL: {nft.imageOriginalUrl}</p>
                <p>Token ID: {nft.tokenId}</p>
                <p>Address: {nft.address}</p>
                <p>Token Metadata: {nft.tokenMetadata}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No similar NFTs found.</p>
        )}
      </div>
    </div>
  );
}

export default ImageUploadComponent;
