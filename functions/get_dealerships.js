/**
 *
 * main() will be run when you invoke this action
 *
 * @param Cloud Functions actions accept a single parameter, which must be a JSON object.
 *
 * @return The output of this action, which must be a JSON object.
 *
 */
const { CloudantV1 } = require("@ibm-cloud/cloudant");
const { IamAuthenticator } = require("ibm-cloud-sdk-core");

async function main(params) {
  console.log("params", params);
  const authenticator = new IamAuthenticator({
    apikey: "5DPKvie8R4beZ5FIx9tkyOtnTIOrlSkEFFg7OVYyr1gz",
  });
  const cloudant = CloudantV1.newInstance({
    authenticator: authenticator,
  });
  cloudant.setServiceUrl(
    "https://4599ccaf-0bdf-4ff3-b934-583631a0bdb0-bluemix.cloudantnosqldb.appdomain.cloud"
  );
  if (params.__ow_method == "get") {
    if (params.state) {
      try {
        // return {body:params};
        let dbListPromise = await getAllRecords(
          cloudant,
          "dealerships",
          params.state
        );
        return { body: dbListPromise };
      } catch (error) {
        return { error: error.description };
      }
    }
    try {
      // return {body:params};
      let dbListPromise = await getAllRecords(cloudant, "dealerships");
      return { body: dbListPromise };
    } catch (error) {
      return { error: error.description };
    }
  }
}

function getAllRecords(cloudant, dbname) {
  return new Promise((resolve, reject) => {
    cloudant
      .postAllDocs({ db: dbname, includeDocs: true, limit: 100 })
      .then((result) => {
        resolve(result.result.rows);
      })
      .catch((err) => {
        console.log(err);
        reject({ err: err });
      });
  });
}

function getMatchingRecords(cloudant, dbname, state) {
  return new Promise((resolve, reject) => {
    cloudant
      .postFind({ db: dbname, state: state })
      .then((result) => {
        resolve(result.result.docs);
      })
      .catch((err) => {
        console.log(err);
        reject({ err: err });
      });
  });
}