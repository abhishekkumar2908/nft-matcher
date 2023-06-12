import React, { useState, useEffect } from 'react';
import '../assets/style/ImageUploadComponent.css';
import { myAxios } from '../services/helper';
import axios from 'axios';
import ImageContainer from './ImageContainer';


function ImageUploadComponent() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [similarNFTs, setSimilarNFTs] = useState([]);
  const [uploadState, setUploadState] = useState(false);

  
  
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
        console.log("res", response.data);
        setSimilarNFTs(response.data);  
        setUploadState(true);

      })
      .catch((error) => {
        console.error(error);
      });

  };
  useEffect(() => {
    if (fileName !== '') {
      setUploadState(false);
    }
  }, [fileName]);
  // useEffect(() => {
  //   const fetchAssetInfo = async () => {

  //       const fetchedAssetInfo = [];
  //       let i=0
  //       console.log("similarNFTs.length",similarNFTs.length)
  //       const url = similarNFTs[i].tokenMetadata;
  //       console.log("url:", url);
  //       while(i<similarNFTs.length) {

  //         let response;
  //         try {          
           
  //           if(url.match(/ipfs\/([a-zA-Z0-9]+)/)){
  //             const ipfsHash = url.match(/ipfs\/([a-zA-Z0-9]+)/);
  //             response = await axios.get(`https://ipfs.io/ipfs/${ipfsHash[1]}/metadata.json}`, { responseType: 'json' });
  //             const metadata = response.data;

  //             console.log("ipfsHash response: ", metadata);
  //           }    
  //           else {
  //           response = await axios.get(`https://testnets-api.opensea.io/api/v1/asset/${similarNFTs[i].address}/${similarNFTs[i].tokenId}/`);
  //             if (response) {
  //               console.log("log", response);
  //               fetchedAssetInfo.push(response.data);
  //               setAssetInfo(fetchedAssetInfo);                
  //             }
  //           }  
  //           i++
  //           } catch (error) {
  //             console.error(error);
  //           }
  //           await new Promise((resolve) => setTimeout(resolve, 450));
  //         }
 
  //   };

  //   if(similarNFTs && similarNFTs.length) {
  //       fetchAssetInfo();
  //   }
  // }, [similarNFTs]);

  

  return (
    <div className="container">
      <h2 className="title">Upload an Image to search similar image</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group" >
          <label htmlFor="imageInput" className="file-label">
            <input type="file" id="imageInput" onChange={handleFileChange} className="file-input" />
            <span className="file-cta">{fileName ? fileName : 'Choose File'}</span>
          </label>
        </div>
        <button type="submit" className="upload-button"  >
          Check
        </button>
      </form>
      <div style={{marginTop: '18px'}}>
        { uploadState && similarNFTs.length > 0 ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
          {similarNFTs.map((nft) => (
            <div key={nft.id} style={{ width: '300px', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' }}>
              
              <div style={{ position: 'relative' }}>
                <ImageContainer imageUrl={nft.imageOriginalUrl} style={{ width: '100%', height: 'auto', borderRadius: '8px 8px 0 0' }} />
              </div>
              <div style={{ padding: '10px', backgroundColor: '#fff', maxHeight: '120px', overflowY: 'auto' }}>
                <p style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 8px' }}>NFT ID: {nft.nftId}</p>
                <p style={{ fontSize: '14px', margin: '0 0 8px' }}>Token ID: {nft.tokenId}</p>
                <p style={{ fontSize: '14px', margin: '0', overflowWrap: 'break-word' }}>Address: {nft.address}</p>
              </div>

            </div>
          ))}
        </div>  
               
        ) : (
          uploadState && <p>No similar NFTs found.</p>        )}
      </div>
    </div>
  );
}

export default ImageUploadComponent;
