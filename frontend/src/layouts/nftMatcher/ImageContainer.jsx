import React, { useEffect, useState } from "react";

function ImageContainer(imageUrl) {
  const [usingGateway, setUsingGateway] = useState(process.env.REACT_APP_IPFS_GATEWAY);
  const [index, setIndex] = useState(0);
  const REACT_APP_BACKUP_IPFS_GATEWAYS = process.env.REACT_APP_BACKUP_IPFS_GATEWAY.split(",");

  useEffect(() => {
    console.log("usingGateway usingGateway usingGateway");
    console.log(usingGateway);
    console.log(imageUrl);
    // if (imageUrl) {
    //   const extension = imageUrl.split(".");
    // }
  }, [imageUrl]);

  useEffect(() => {
    if (index) {
      setUsingGateway(REACT_APP_BACKUP_IPFS_GATEWAYS[index]);
    }
  }, [index]);

  return (
    <div style={{ height: "300px", textAlign: "center" }}>
      <img
        src={
          imageUrl && imageUrl.imageUrl
            ? imageUrl.imageUrl.includes("ipfs://")
              ? usingGateway + imageUrl.imageUrl.split("ipfs://")[1]
              : imageUrl.imageUrl
            : ""
        }
        alt="banner"
        style={{
          // filter: "blur(8px)",
          maxWidth: "100%",
          maxHeight: "100%",
          // objectFit: "cover",
        }}
      />
      {/* <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-60%, -50%)",
        }}
      >
        <img
          src={
            imageUrl ? imageUrl.imageUrl : ""
            // ? imageUrl.includes("ipfs://")
            //   ? usingGateway + imageUrl.split("ipfs://")[1]
            //   : imageUrl
            // : ""
          }
          alt="banner"
          className="w-full h-full object-scale-down"
          style={{
            height: "288px",
            objectFit: "contain",
            // borderRadius: "5px",
            width: "360px",
          }}
        />
      </div> */}
    </div>
  );
}

export default ImageContainer;
