// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { response } from 'express';

// function AssetInformationComponent({ tokenId, address }) {
//   const [assetInfo, setAssetInfo] = useState([]);

//   useEffect(() => {
//     console.log("tokenid:", tokenId);
//     console.log("addresses:", address);

//     const fetchAssetInfo = async () => {
//         const fetchedAssetInfo = [];
//         let response;
//         while(!response){
//         // try {
//         //     await new Promise((resolve) => setTimeout(resolve, 300));
//         //     const url = response.data.token_metadata;
//         //     if(url.match(/ipfs\/([a-zA-Z0-9]+)/)){
//         //       const ipfsHash = url.match(/ipfs\/([a-zA-Z0-9]+)/);
//         //       response = await axios.get(`https://ipfs.io/ipfs/${ipfsHash[1]}/`);
//         //       console.log("ipfsHash response: ", response);
//         //     }       
//             try{response = await axios.get(`https://testnets-api.opensea.io/api/v1/asset/${address}/${tokenId}/`);
//               if (response) {
//                 console.log("log", response);
//                 fetchedAssetInfo.push(response.data);
//                 setAssetInfo(fetchedAssetInfo);
                
//               }
//             } catch (error) {
//               console.error(error);
//             }
//           }
//     }
//     if(tokenId && address) {
//         fetchAssetInfo();
//     }
//   }, [tokenId, address]);

//   return (
//     <div>
//       {assetInfo.length > 0 ? (
//         <ul>
//           {assetInfo && assetInfo?.length && assetInfo.map((info) => (
//             <li key={info.id}>
//               <img style={{ height: "345px", width: "345px" }} src={info.image_thumbnail_url} alt='' />
//               <h2>{info.name}</h2>
//               <p>NFT Id: {info.id}</p>
//               <p>Token Id: {info.token_id}</p>
//               <p>Description: {info.description}</p>
//               <p>Number of Sales: {info.num_sales}</p>
//               <p>Chain Identifier: {info?.asset_contract?.chain_identifier}</p>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>Loading asset information...</p>
//       )}
//     </div>
//   );
// }

// export default AssetInformationComponent;
