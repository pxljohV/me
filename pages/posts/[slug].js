import Image from 'next/image'

export default function Post(data) {
    
    console.log(data)
    const post = data.posts;
    const cover = data.posts.featuredImage.node.sourceUrl;//cover
   
    return(
        <div>
            <h1>POSTS:</h1>
            <h2>{post.title}</h2>
            <Image src={cover} width={200} height={200} alt=""/>
            <article dangerouslySetInnerHTML={{__html: post.content}}></article>
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
    const paths= posts.map((post)=>({
        params:{slug:post.slug}
    }))
    //returns data from paths
    return {paths,fallback:false}

}

/*
    we are pre rendering , see how many pages are in wp, create components accoring
*/