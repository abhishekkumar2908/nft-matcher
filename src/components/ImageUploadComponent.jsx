import React, { useState, useEffect } from "react";
import "../assets/style/ImageUploadComponent.css";
import { myAxios } from "../services/helper";
import ImageContainer from "./ImageContainer";
import AssetInformationComponent from "./AssetInformationComponent";

function ImageUploadComponent() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [similarNFTs, setSimilarNFTs] = useState([]);
  const [uploadState, setUploadState] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [expandedStates, setExpandedStates] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile.name);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    myAxios
      .post("/find/any/similar/image", formData)
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

  const handleMoreClick = (nft) => {
    setSelectedNFT((prevSelectedNFT) => {
      if (prevSelectedNFT && prevSelectedNFT.id === nft.id) {
        return null;
      } else {
        return nft;
      }
    });
    setExpandedStates((prevExpandedStates) => ({
      ...prevExpandedStates,
      [nft.id]: !prevExpandedStates[nft.id],
    }));
  };

  useEffect(() => {
    if (fileName !== "") {
      setUploadState(false);
    }
  }, [fileName]);

  return (
    <>
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
            <span className="file-cta">
              {fileName ? fileName : "Choose File"}
            </span>
          </label>
        </div>
        <button type="submit" className="upload-button">
          Check
        </button>
      </form>

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
              <div
                key={nft.id}
                style={{ display: "flex" }}
                className="container_item"
              >
                <div style={{ position: "relative" }}>
                  <ImageContainer
                    className="imageContainer"
                    imageUrl={nft.imageOriginalUrl}
                  />
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
                  <p style={{ fontSize: "14px", margin: "0 0 8px" }}>
                    Token ID: {nft.tokenId}
                  </p>
                  <p
                    style={{
                      fontSize: "14px",
                      margin: "0",
                      overflowWrap: "break-word",
                    }}
                  >
                    Address: {nft.address}
                  </p>
                  <button onClick={() => handleMoreClick(nft)}>
                    {expandedStates[nft.id] ? "-" : "+"}
                  </button>
                </div>
                {expandedStates[nft.id] && (
                  <div style={{ marginLeft: "20px" }}>
                    {selectedNFT ? (
                      <div style={{ marginTop: "18px", display: "flex" }}>
                        <AssetInformationComponent nft={selectedNFT} />
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
