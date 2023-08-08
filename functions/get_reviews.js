function main(params) {
    return new Promise(function (resolve, reject) {
      const { CloudantV1 } = require("@ibm-cloud/cloudant");
      const { IamAuthenticator } = require("ibm-cloud-sdk-core");
      const authenticator = new IamAuthenticator({
        apikey: "vU6E9mr5D3wAKrdFO4fRHv89ZxnPMHov8z0VRLXitmzM", // TODO: Replace with your own API key
      });
      const cloudant = CloudantV1.newInstance({
        authenticator: authenticator,
      });
      cloudant.setServiceUrl(
        "https://cb75fb76-00d7-4fc7-81e6-9f1a71a0826a-bluemix.cloudantnosqldb.appdomain.cloud"
      ); // TODO: Replace with your own service URL
      dealership = parseInt(params.dealerId);
      // return reviews with this dealer id
      cloudant
        .postFind({
          db: "reviews",
          selector: {
            dealership: parseInt(params.dealerId),
          },
        })
        .then((result) => {
          let code = 200;
          if (result.result.docs.length == 0) {
            code = 404;
          }
          resolve({
            statusCode: code,
            headers: { "Content-Type": "application/json" },
            body: result.result.docs,
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  
  // example invocation
  let result = main({ dealerId: 15 });
  result.then((reviews) => console.log(reviews));