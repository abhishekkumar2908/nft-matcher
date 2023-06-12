import React, { useEffect, useState } from "react";

function ImageContainer({ imageUrl }) {
  const [usingGateway, setUsingGateway] = useState(
    process.env.REACT_APP_IPFS_GATEWAY
  );
  const [index, setIndex] = useState(0);
  const REACT_APP_BACKUP_IPFS_GATEWAYS =
    process.env.REACT_APP_BACKUP_IPFS_GATEWAY.split(",");

  useEffect(() => {
    if (imageUrl) {
      const extension = imageUrl.split(".");
    }
  }, [imageUrl]);

  useEffect(() => {
    if (index) {
      setUsingGateway(REACT_APP_BACKUP_IPFS_GATEWAYS[index]);
    }
  }, [index]);

  return (
    <>
    <img
      src={
        imageUrl
          ? imageUrl.includes("ipfs://")
            ? usingGateway + imageUrl.split("ipfs://")[1]
            : imageUrl
          : ""
      }
      alt="banner"
      className="w-full h-full object-scale-down absolute"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "contain",
        borderRadius: "5px",
      }}
    />
  </>
  
  );
}

export default ImageContainer;