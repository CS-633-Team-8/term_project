const knowledgeBases = require("./managed-knowledge");
const cloudStorage = require("./cloud-storage");
var csv = require("csvtojson");
const { parse } = require("json2csv");
const fs = require("fs");
//import arrayToCsv from "./arrayToCsv"

const projectId = process.env.GCLOUD_PROJECT;
const bucketName = "harold_css633_faq";
const knowledgeBaseId =
  "projects/harold-ctogdt/knowledgeBases/MTY4MDE2MDQxOTg2OTYyMjI3MjA";

async function getFAQSAsJSON() {
  const now = Date.now();
  const fileName = `temp${now}`;

  try {
    const kbs = await knowledgeBases.listKnowledgeBases(projectId);
    //console.log("1", kbs);
    const docs = await knowledgeBases.listDocuments(projectId, kbs);
    //console.log("2", docs);
    const url = await knowledgeBases.getDocumentURL(docs[0].name);
    //console.log("3", url);
    const document = await cloudStorage.downloadDocument(fileName, url);
    const json = await csv({ noheader: true }).fromFile(document);
    return json;
  } catch (e) {
    console.log(e);
  }
}

async function replaceFAQs(array) {
  //console.log("MyCSV: ",array)
  try {
    const csv = parse(array, { header: false });
    const now = Date.now();
    const filePath = `./temp/csv${now}.csv`;
    fs.writeFile(filePath, csv, function(err) {
      if (err) {
        console.error(err);
        return false;
      }
      // upload to bucket
      cloudStorage
        .uploadDocument(filePath, bucketName)
        .then(resp => {
          const dialogflow = require("dialogflow").v2beta1;
          const filePath = `gs://${resp[0].metadata.bucket}/${resp[0].metadata.name}`;
          //console.log(filePath);
          // Instantiate a DialogFlow Documents client.
          const client = new dialogflow.DocumentsClient({
            projectId: projectId
          });
          const request = {
            parent: knowledgeBaseId,
            document: {
              knowledgeTypes: ["FAQ"],
              displayName: now,
              contentUri: filePath,
              source: `contentUri`,
              mimeType: "text/csv"
            }
          };
          client.listKnowledgeBases(projectId).then(kbs => {
            client.listDocuments({ parent: kbs[0].name }).then(doc => {
              console.log("list documents", doc[0][0].name);
              client.deleteDocument({ name: doc[0][0].name }).then(res => {
                console.log("delete doc resp: ", resp);
                client.createDocument(request).then(response => {
                  console.log("createDoc Responce: ", response);
                });
              });
            });
          })
          
        })
        .catch(err => console.error(err));
    });
  } catch (e) {
    console.error(e);
  }

  //point knowledgbase to document
}

module.exports = { getFAQSAsJSON, replaceFAQs };
