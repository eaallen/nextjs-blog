const CLIENT_ID = '445385097267-vgo50go7l1pb6phua5tk9ea82riq0h35.apps.googleusercontent.com'
const API_KEY = 'AIzaSyD3AJ0B3HGnnzfwQqnqnTz77bs5ZQFucmA';

// Array of API discovery doc URLs for APIs used by the sample
const DISCOVERY_DOCS = [
  'https://docs.googleapis.com/$discovery/rest?version=v1'];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = "https://www.googleapis.com/auth/documents.readonly";
onGapiLoad()
function onGapiLoad() {
  console.log('we are here we are here we are here', window)
  // handleClientLoad()
}


/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
  console.log('oi', gapi);
  gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  console.log('why')
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
    // Listen for sign-in state changes.
    console.log('00000')
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    // authorizeButton.onclick = handleAuthClick;
    // signoutButton.onclick = handleSignoutClick;
  }).catch(x => console.log(x));
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    // authorizeButton.style.display = 'none';
    // signoutButton.style.display = 'block';
    printDocBody();
  } else {
    // authorizeButton.style.display = 'block';
    // signoutButton.style.display = 'none';
  }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
  var pre = document.getElementById('content');
  var textContent = document.createTextNode(message + '\n');
  pre.appendChild(textContent);
}

/**
 * Prints the JSON body of a document.
 */
function printDocBody() {
  gapi.client.docs.documents.get({
    documentId: '175RNt1e66oACbONuPFqNVeX0_mco_BXrIEwn7d4LPio'
  }).then(function (response) {
    var doc = response.result;
    // appendPre(JSON.stringify(doc.body, null, 4));
    console.log(doc.body)
  }, function (response) {
    console.error(response)
    // appendPre('Error: ' + response.result.error.message);
  });
}

