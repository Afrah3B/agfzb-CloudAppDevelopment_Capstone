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
      // add id to review
      doc = params.review;
      doc.id = Math.floor(Math.random() * (80 - 15) + 15);
      cloudant
        .postDocument({
          db: "reviews",
          document: doc,
        })
        .then((result) => {
          let code = 201;
          resolve({
            statusCode: code,
            headers: { "Content-Type": "application/json" },
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  
  // example invocation
  let result = main({
    json: {
      time: "2022-08-10T14:12:12.927873",
      name: "Another Test Person",
      dealership: 3,
      review: "This is just another review from another person. Good enough.",
      purchase: false,
      purchase_date: "",
      car_make: "Volvo",
      car_model: "V60 Recharge",
      car_year: "2022",
    },
  });
  result.then((message) => console.log(message));