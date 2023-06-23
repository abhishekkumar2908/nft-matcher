const dev = {
  site: {
    BASE_URL: "http://localhost:3000/",
  },
  awsConfig: {
    Region: "ap-south-1",
    UserPoolId: "ap-south-1_QEpROgOaY",
    ClientId: "6kuq7t0vc3r2iu6nbvpa25n0ph",
    LoginURL: "https://qualtab.auth.ap-south-1.amazoncognito.com",
  },
  api: {
    BASE_URL: "http://localhost:8083",
  },
};

const dockerdev = {
  site: {
    BASE_URL: "https://main.d2fp9tvqgkwjq0.amplifyapp.com/",
  },
  awsConfig: {
    Region: "ap-east-1",
    UserPoolId: "us-east-1_PXTewAd8m",
    ClientId: "3j3be0nenmhoe4pnqeth7fgmk1",
    LoginURL: "https://oktaknowledgeontap.auth.us-east-1.amazoncognito.com",
  },
  api: {
    BASE_URL: "https://d3j8qswhlsl5tj.cloudfront.net",
  },
};

const prod = {
  site: {
    BASE_URL: "http://localhost:3000/",
  },
  awsConfig: {
    Region: "ap-south-1",
    UserPoolId: "ap-south-1_QEpROgOaY",
    ClientId: "6kuq7t0vc3r2iu6nbvpa25n0ph",
    LoginURL: "https://oktaknowledgeontap.auth.us-east-1.amazoncognito.com",
  },
  api: {
    BASE_URL: "http://localhost:8080",
  },
};

let config = prod;
process.env.REACT_APP_STAGE = config;
console.log("Selected stage: " + process.env.REACT_APP_STAGE);
if (process.env.REACT_APP_STAGE === "dockerdev") {
  config = dockerdev;
} else if (process.env.REACT_APP_STAGE === "production") {
  config = prod;
}

export default {
  ...config,
};
