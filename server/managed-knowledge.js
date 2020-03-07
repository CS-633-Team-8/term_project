'use strict';

let projectId = process.env.GCLOUD_PROJECT;
let knowledgeBaseId = process.env.KNOWLEDGE_BASE_ID;

const {struct} = require('pb-util');
const sessionId = require('uuid/v1')();
const util = require('util');

let config = {
  credentials: {
    private_key: process.env.DIALOGFLOW_PRIVATE_KEY,
    client_email: process.env.DIALOGFLOW_CLIENT_EMAIL
  }
};

async function createKnowledgeBase(projectId, displayName) {
  // [START dialogflow_create_knowledge_base]
  // Imports the Dialogflow client library
  const dialogflow = require('dialogflow').v2beta1;

  // Instantiate a DialogFlow client.
  //const client = new dialogflow.KnowledgeBasesClient(config);
  const client = new dialogflow.KnowledgeBasesClient();

  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // const projectId = 'ID of GCP project associated with your Dialogflow agent';
  // const displayName = `cs633faq`;

  const formattedParent = client.projectPath(projectId);
  const knowledgeBase = {
    displayName: displayName,
  };
  const request = {
    parent: formattedParent,
    knowledgeBase: knowledgeBase,
  };

  const [result] = await client.createKnowledgeBase(request);
  // console.log(`Name: ${result.name}`);
  // console.log(`displayName: ${result.displayName}`);

  // [END dialogflow_create_knowledge_base]
}

async function getKnowledgeBase(projectId, knowledgeBaseId) {
  // [START dialogflow_get_knowledge_base]
  // Imports the Dialogflow client library
  const dialogflow = require('dialogflow').v2beta1;

  // Instantiate a DialogFlow client.
  const client = new dialogflow.KnowledgeBasesClient({
    projectId: projectId,
    ...config,
  });

  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // const projectId = 'ID of GCP project associated with your Dialogflow agent';
  const knowledgeBaseFullName = `cs633faq`;
  const formattedName = client.knowledgeBasePath(projectId, knowledgeBaseId);

  const [result] = await client.getKnowledgeBase({name: formattedName});
  console.log(`Server retrieved KnowledgeBase: ${result.displayName}`);
  // [END dialogflow_get_knowledge_base]
}

async function listKnowledgeBases(projectId) {
  // [START dialogflow_list_knowledge_base]
  // Imports the Dialogflow client library
  const dialogflow = require('dialogflow').v2beta1;

  // Instantiate a DialogFlow KnowledgeBasesClient.
  const client = new dialogflow.KnowledgeBasesClient({
    projectPath: projectId,
  });

  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // const projectId = 'ID of GCP project associated with your Dialogflow agent';

  const formattedParent = client.projectPath(projectId);
  var returnName = "";
  const [resources] = await client.listKnowledgeBases({
    parent: formattedParent,
  });
  resources.forEach(r => {
    // console.log(`displayName: ${r.displayName}`);
    // console.log(`name: ${r.name}`);
    returnName = r.name;
  });

  return returnName;
  // [END dialogflow_list_knowledge_base]
}

async function deleteKnowledgeBase(projectId, knowledgeBaseFullName) {
  // [START dialogflow_delete_knowledge_base]
  // Instantiate a DialogFlow client.
  const dialogflow = require('dialogflow').v2beta1;

  // Instantiate a DialogFlow KnowledgeBasesClient.
  const client = new dialogflow.KnowledgeBasesClient();

  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // const projectId = 'ID of GCP project associated with your Dialogflow agent';
  // const knowledgeBaseFullName = `the full path of your knowledge base, e.g my-Gcloud-project/myKnowledgeBase`;

  const [result] = await client.deleteKnowledgeBase({
    name: knowledgeBaseFullName,
  });

  if (result.name === 'undefined') console.log(`Knowledge Base deleted`);
  // [END dialogflow_delete_knowledge_base]
}

async function createDocument(
  projectId,
  knowledgeBaseFullName,
  documentPath,
  documentName,
  knowledgeTypes,
  mimeType
) {
  // [START dialogflow_create_document]
  // Imports the Dialogflow client library
  const dialogflow = require('dialogflow').v2beta1;

  // Instantiate a DialogFlow Documents client.
  const client = new dialogflow.DocumentsClient({
    projectId: projectId,
  });

  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // const projectId = 'ID of GCP project associated with your Dialogflow agent';
  // const knowledgeBaseFullName = `the full path of your knowledge base, e.g my-Gcloud-project/myKnowledgeBase`;
  // const documentPath = `path of the document you'd like to add, e.g. https://dialogflow.com/docs/knowledge-connectors`;
  // const documentName = `displayed name of your document in knowledge base, e.g. myDoc`;
  // const knowledgeTypes = `The Knowledge type of the Document. e.g. FAQ`;
  // const mimeType = `The mime_type of the Document. e.g. text/csv, text/html,text/plain, text/pdf etc.`;

  const request = {
    parent: knowledgeBaseFullName,
    document: {
      knowledgeTypes: [knowledgeTypes],
      displayName: documentName,
      contentUri: documentPath,
      source: `contentUri`,
      mimeType: mimeType,
    },
  };

  const [operation] = await client.createDocument(request);
  const [response] = await operation.promise();
  return response;

  // [END dialogflow_create_document]
}

async function listDocuments(projectId, knowledgeBaseFullName) {
  // [START dialogflow_list_document]
  // Imports the Dialogflow client library
  const dialogflow = require('dialogflow').v2beta1;

  // Instantiate a DialogFlow Documents client.
  const client = new dialogflow.DocumentsClient({
    projectId: projectId,
  });

  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // const projectId = 'ID of GCP project associated with your Dialogflow agent';
  // const knowledgeBaseFullName = `the full path of your knowledge base, e.g my-Gcloud-project/myKnowledgeBase`;

  const [resources] = await client.listDocuments({
    parent: knowledgeBaseFullName,
  });
  console.log(
    `There are ${resources.length} documents in ${knowledgeBaseFullName}`
  );
  // resources.forEach(resource => {
  //   console.log(`KnowledgeType: ${resource.knowledgeType}`);
  //   console.log(`displayName: ${resource.displayName}`);
  //   console.log(`mimeType: ${resource.mimeType}`);
  //   console.log(`contentUri: ${resource.contentUri}`);
  //   console.log(`source: ${resource.source}`);
  //   console.log(`name: ${resource.name}`);
  // });

  return resources;
  // [END dialogflow_list_document]
}

async function getDocument(documentId) {
  // [START dialogflow_get_document]
  // Imports the Dialogflow client library
  const dialogflow = require('dialogflow').v2beta1;

  // Instantiate a DialogFlow Documents client.
  const client = new dialogflow.DocumentsClient({
    projectId: projectId,
  });

  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // const documentId = `full path to document in knowledge base, e.g. myKnowledgeBase/documents/myDoc`;

  const [r] = await client.getDocument({name: documentId});

  return r;
  // [END dialogflow_get_document]
}

async function getDocumentURL(documentId) {
  // [START dialogflow_get_document]
  // Imports the Dialogflow client library
  const dialogflow = require('dialogflow').v2beta1;

  // Instantiate a DialogFlow Documents client.
  const client = new dialogflow.DocumentsClient({
    projectId: projectId,
  });

  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // const documentId = `full path to document in knowledge base, e.g. myKnowledgeBase/documents/myDoc`;

  const [r] = await client.getDocument({name: documentId});

  return r.contentUri;
  // [END dialogflow_get_document]
}

async function deleteDocument(projectId, documentId) {
  // [START dialogflow_delete_document]
  // Imports the Dialogflow client library
  const dialogflow = require('dialogflow').v2beta1;

  // Instantiate a DialogFlow Documents client.
  const client = new dialogflow.DocumentsClient({
    projectId: projectId,
  });

  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // const projectId = 'ID of GCP project associated with your Dialogflow agent';
  // const documentId = `full path to document in knowledge base, e.g. myKnowledgeBase/documents/myDoc`;

  const [operation] = await client.deleteDocument({name: documentId});
  const responses = await operation.promise();
  if (responses[2].done === true) console.log(`document deleted`);
  // [END dialogflow_delete_document]
}

module.exports = {listKnowledgeBases, listDocuments, getDocumentURL, createDocument, deleteDocument}
