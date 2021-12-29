const express = require('express');
const docs = require('@googleapis/docs')
const {authenticate} = require('@google-cloud/local-auth');
const path = require('path');

const router = express.Router();

/* GET home page. */
router.get('/', async function (req, res, next) {
  try{
    await runSample()
    res.json({
      code: 0,
      text: 'you were able to create a doc'
    })
  }catch(e){
    console.error(e)
    res.json({
      code: 1,
      text: 'failed!',
      error: e,
    })
  }
});

async function runSample() {
  // Obtain user credentials to use for the request
  const auth = await authenticate({
    keyfilePath: path.join(__dirname, "../../credentials.json"),//path.join(__dirname, '../oauth2.keys.json'),
    scopes: 'https://www.googleapis.com/auth/documents',
  });
  google.options({auth});

  // The initial call to create the doc will have a title but no content.
  // This is a limitation of the underlying API.
  const createResponse = await docs.documents.create({
    requestBody: {
      title: 'Your new document!',
    },
  });
  console.log(createResponse.data);

  // now that we created the doc, let's add content using the
  // documentId returned from the create call.
  const updateResponse = await docs.documents.batchUpdate({
    documentId: createResponse.data.documentId,
    requestBody: {
      requests: [
        {
        insertText: {
          // The first text inserted into the document must create a paragraph,
          // which can't be done with the `location` property.  Use the
          // `endOfSegmentLocation` instead, which assumes the Body if
          // unspecified.
          endOfSegmentLocation: {},
          text: 'Hello there!'
        }
      }]
    }
  });
  console.log(updateResponse.data);
  return updateResponse.data;
}

async function createDoc() {
  const auth = new docs.auth.GoogleAuth({
    keyFilename: path.join(__dirname,"../../credentials.json"),//path.join(__dirname, '../oauth2.keys.json'),
    // Scopes can be specified either as an array or as a single, space-delimited string.
    scopes: ['https://www.googleapis.com/auth/documents']
  });
  console.log(auth)
  const authClient = await auth.getClient();

  console.log(authClient)

  const client = await docs.docs({
    version: 'v1',
    auth: authClient
  });

  const createResponse = await client.documents.create({
    requestBody: {
      title: 'Your new document!',
    },
  });

  console.log(createResponse.data);
}

module.exports = router;
