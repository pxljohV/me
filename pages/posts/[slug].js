import Image from 'next/image'
import Top from '../Components/Top'

export default function Post(data) {

    const post = data.posts;
    const img = data.posts.featuredImage.node.sourceUrl;//cover

    return (
        <div>
            <Top />

            <div className='relative mw8 black center'>

                <h2>{post.title}</h2>
                <Image src={img} width={120} height={50} objectFit="cover" layout="responsive" alt="" />
                <article dangerouslySetInnerHTML={{ __html: post.content }}></article>
            </div>
        </div>
    )
}

export async function getStaticProps(ctx) {

    const res = await fetch('https://graciahernandez.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: `
                query SinglePost($id: ID!, $idType: PostIdType!){
                    post(id: $id, idType: $idType){
                        title
                        slug
                        content
                        featuredImage{
                            node{
                                sourceUrl
                            }
                        }
                    }
                }
            `,
            variables: {
                id: ctx.params.slug,
                idType: 'SLUG',
            }
        })
    })

    const json = await res.json()

    return {
        props: {
            posts: json.data.post,
        },
    }

}

export async function getStaticPaths() {
    const res = await fetch('https://graciahernandez.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: `
          query AllPostsQuery{
            posts{
              nodes{
                slug
                content
                title
              }
            }
          }`
        })
    })
    const json = await res.json();
    const posts = await json.data.posts.nodes;

    //array of paths 
    const paths = posts.map((post) => ({
        params: { slug: post.slug }
    }))
    //returns data from paths
    return { paths, fallback: false }

}

/*
    we are pre rendering , see how many pages are in wp, create components accoring
*/