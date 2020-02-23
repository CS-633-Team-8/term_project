'use-strict';

async function downloadDocument(fileName, path) {
  // [START storage_download_file]
  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  const bucketName = path.slice(5,22);
  const srcFilename = path.slice(23);
  const destFilename = `./temp/${fileName}`;

  console.log("Trying to download file with bucket: ", bucketName, ", and fileName: ", srcFilename, " To: ", destFilename);

  // Imports the Google Cloud client library
  const {Storage} = require('@google-cloud/storage');

  // Creates a client
  const storage = new Storage();

  async function downloadFile() {
    const options = {
      // The path to which the file should be downloaded, e.g. "./file.txt"
      destination: destFilename,
    };

    // Downloads the file
    await storage
      .bucket(bucketName)
      .file(srcFilename)
      .download(options);

    console.log(
      `gs://${bucketName}/${srcFilename} downloaded to ${destFilename}.`
    );
  }

  await downloadFile().catch(console.error);
  return destFilename;
  // [END storage_download_file]
}

async function uploadDocument(url, bucketName){
  // Imports the Google Cloud client library
  const {Storage} = require('@google-cloud/storage');

  // Creates a client
  const storage = new Storage();
  const bucket = storage.bucket(bucketName);
  return bucket.upload(url);
}

module.exports = {downloadDocument, uploadDocument};