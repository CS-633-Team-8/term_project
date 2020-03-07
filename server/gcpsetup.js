var fs=require('fs');

if (process.env.NODE_ENV == 'production') {
  fs.writeFile(process.env.GCP_KEY_FILE, process.env.GCP_CRED, (err) => {console.log("Error creating Google Credentials: ",err)});
}
