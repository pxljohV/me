
import Image from 'next/image'
import Link from 'next/link'
import Top from './Components/Top'


import NewsSlide from './Components/NewsSlide'


export default function Home({ posts, cat }) {

  console.log(cat)

  const _post = `/posts/${cat.edges[0].node.slug}`

  return (

    <div className="main-container  center bg-black-10 ">

      <Top />
      <NewsSlide />

      <div id="view" className="view mw8 w-100 center">
        
        <main className=" w-100">
          
          <article className="w-100 center pa2">
            <section className="main w-80 ">
              <h3 className=" f6 red w4 ">Noticia del día</h3>
              <div className="red  center ">
                <Link href={_post}>
                  <a>
                    <div className="relative">
                      <Image src={cat.edges[0].node.featuredImage.node.sourceUrl} width={120} height={50} objectFit="cover" layout="responsive" alt="cover" />
                      <div className="w-100 bg-black-80  pa3 absolute bottom-0 ">
                        <h2 className="titular white f3  ">{cat.edges[0].node.title}</h2>

                        <p className=" " dangerouslySetInnerHTML={{ __html: cat.edges[0].node.date }}></p>
                      </div>
                    </div>
                  </a>
                </Link>
              </div >

            </section>

            <section >
              <h3 className=" f6 red mw6  ">Noticias <br></br><span><hr className="" width=""></hr></span></h3>
              
              <div className="flex flex-wrap">
                {
                  posts.nodes.map(post => {
                    const _post = `/posts/${post.slug}`
                    return (

                      <div key={post.slug} className="red  w5   ">
                        <Link href={_post}>
                          <a>
                            <div className="relative ">
                              <Image src={post.featuredImage.node.sourceUrl} width={160} height={120} layout="responsive" objectFit="cover" alt="cover" />
                              <div className="w-100 bg-black-70 pa1 pl2 absolute bottom-0 ">
                                <h3 className="titular white f4  ">{post.title}</h3>

                                <h6 className=" f7" dangerouslySetInnerHTML={{ __html: post.date }}></h6>
                              </div>
                            </div>
                          </a>
                        </Link>
                      </div >
                    )

                  })
                }
              </div>
            </section>
          </article>
        </main>
        <footer>

        </footer>
      </div >
    </div>
  )
}

export async function getStaticProps() {

  const res = await fetch('https://graciahernandez.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        query AllPostsQuery{
          posts (where: {categoryName: "noticias"}){
            nodes{
              id
              slug
              date
              excerpt
              content
              title
              categories {
                edges {
                  node {
                    id
                    name
                  }
                }
              }
              featuredImage{
                node{
                  sourceUrl
                }
              }
            }
          }
        }`
    })
  })


  const cat = await fetch('https://graciahernandez.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        query AllPostsQuery{
          posts(where: {categoryName: "top"}) {
            edges {
              node {
                id
                excerpt
                content
                title
                featuredImage {
                  node {
                    sourceUrl
                  }
                }
                date
                content
                slug
              }
            }
          }
        }
      `

    })
  })
  const json = await res.json();
  const _json = await cat.json();

  return {
    props: {
      posts: json.data.posts,
      cat: _json.data.posts,
    },
  }
}

