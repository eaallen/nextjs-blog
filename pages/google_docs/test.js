import Layout from '../../components/layout'
// import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import GoogleDocParagraph from '../../components/google_docs/googleDocParagraph'
import GAPI from '../../lib/GAPI'



export async function getStaticProps({ params }) {
  // const postData = await getPostData(params.id)
  // get data
  console.log(params)
  let json = { eli: 'is awesome' }

  // const data = await fetch('https://script.google.com/macros/s/AKfycbw8j5wGTn0DDzAungzfztsjS5toW1lxQQiGKfd1zXKZ_jFiqrZswQXpIzvFTm4xjQia/exec')

  // let jsonText = await data.text()

  json = await GAPI.getDoc('https://docs.google.com/document/d/1SxrjSRdfSzcWa-M1OrK9tPZF1kEB9maI4zkoTkcSjtY/edit')

  return {
    props: {
      json
    }
  }
}

export default function Post({ json }) {
  // console.log(json)
  return (
    <Layout>
      <Head>
        <title> {'Google Doc Testing'} </title>
      </Head>
      {json.map((item, idx) => <GoogleDocParagraph alignment={item.alignment} paragraphStyle={item.paragraph_style} key={idx} >
        {item.text}
      </GoogleDocParagraph>
      )}
    </Layout>
  )
}
