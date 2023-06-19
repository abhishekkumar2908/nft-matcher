import React, { useState, useEffect } from "react";
import "layouts/style/ImageUploadComponent.css";
import axios from "axios";

// ...........ImageContainer has image url from which image will be displayed..................
import ImageContainer from "./ImageContainer";
// ............................backend api.....................................................
import { getImage } from "layouts/APIs/endPoint";

// ..................for additional information from opensea...................................
import AssetInformationComponent from "layouts/nftMatcher/AssetInformationComponent";

function ImageUploadComponent() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [similarNFTs, setSimilarNFTs] = useState([]);
  const [uploadState, setUploadState] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [expandedStates, setExpandedStates] = useState(false);
  const [index, setIndex] = useState([]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile.name);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    axios
      .post(getImage, formData)
      .then((response) => {
        console.log("res", response.data);
        setSimilarNFTs(response.data);
        setUploadState(true);
        setSelectedNFT(null);
        setExpandedStates({});
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // ................this function will be called when user clicks on More button..............
  const handleMoreClick = (nft) => {
    setIndex((prev) => [...prev, nft.nftId]);

    setSelectedNFT((prevSelectedNFT) => {
      if (prevSelectedNFT && prevSelectedNFT.id === nft.nftId) {
        return null;
      } else {
        return nft;
      }
    });
    setExpandedStates((prevExpandedStates) => ({
      ...prevExpandedStates,
      [nft.nftId]: !prevExpandedStates[nft.nftId],
    }));
  };

  useEffect(() => {
    if (fileName !== "") {
      setUploadState(false);
    }
  }, [fileName]);

  return (
    <>
      <div className="upload-container">
        <h2 className="title">Upload an Image to search similar image</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="imageInput" className="file-label">
              <input
                type="file"
                id="imageInput"
                onChange={handleFileChange}
                className="file-input"
              />
              <span className="file-cta">{fileName ? fileName : "Choose File"}</span>
            </label>
          </div>
          <button type="submit" className="upload-button">
            Check
          </button>
        </form>
      </div>
      <div><p>Note: </p></div>
      {uploadState && similarNFTs.length > 0 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flexWrap: "nowrap",
            justifyContent: "left",
            gap: "20px",
          }}
        >
          <div>
            {similarNFTs.map((nft) => (
              <div key={nft.id} style={{ display: "flex" }} className="container_item">
                <div style={{ position: "relative" }}>
                  <ImageContainer className="imageContainer" imageUrl={nft.imageOriginalUrl} />
                </div>
                <div style={{ flexGrow: 1, alignItems: "flex-start" }}>
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      margin: "0 0 8px",
                    }}
                  >
                    NFT ID: {nft.nftId}
                  </p>
                  <p style={{ fontSize: "14px", margin: "0 0 8px" }}>Token ID: {nft.tokenId}</p>
                  <p
                    style={{
                      fontSize: "14px",
                      margin: "0",
                      overflowWrap: "break-word",
                    }}
                  >
                    Address: {nft.address}
                  </p>
                  <button onClick={() => handleMoreClick(nft)} className="expansion-button">
                    {expandedStates[nft.nftId] ? "Less" : "More"}
                  </button>
                </div>
                {expandedStates[nft.nftId] && (
                  <div style={{ marginLeft: "20px" }}>
                    {selectedNFT ? (
                      <div style={{ marginTop: "1px", display: "flex" }}>
                        <AssetInformationComponent nft={selectedNFT} index={index} />
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        uploadState && <p className="title">No similar NFTs found.</p>
      )}
    </>
  );
}

export default ImageUploadComponent;
