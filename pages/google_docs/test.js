import Layout from '../../components/layout'
// import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import GoogleDocParagraph from '../../components/googleDocParagraph'



export async function getStaticProps({ params }) {
  // const postData = await getPostData(params.id)
  // get data
  console.log(params)
  let json = { eli: 'is awesome' }

  const data = await fetch('https://script.google.com/macros/s/AKfycbw8j5wGTn0DDzAungzfztsjS5toW1lxQQiGKfd1zXKZ_jFiqrZswQXpIzvFTm4xjQia/exec')

  let jsonText = await data.text()

  json = JSON.parse(jsonText)

  return {
    props: {
      json
    }
  }
}

export default function Post({ json }) {
  console.log(json)

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
