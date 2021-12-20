/**
 * API for handling our connection to google app script
 */


// example doc https://docs.google.com/document/d/1SxrjSRdfSzcWa-M1OrK9tPZF1kEB9maI4zkoTkcSjtY/edit
async function getDoc(urlString){
  let url = new URL(
    'https://script.google.com/macros/s/AKfycbwI66mNaH6F6FZI1ThLhA3EdTZo9XFNo4umUQVUpJ1_rbR2JhmqkzGwDXkXxc4ygAJA/exec'
  )

  let params = {data: JSON.stringify({
      // put your params here 
      google_doc_url: urlString
  })}
  
  // add params to url
  url.search = new URLSearchParams(params).toString()

  try{
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    return data
  }catch(error){
    console.error(error)
    return null
  }
  fetch(url)
  // .then(x=> x.json())
  // .then(resp=>console.log(resp))

}

const GAPI = {
  getDoc
}

export default GAPI