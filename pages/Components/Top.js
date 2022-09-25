import Head from 'next/head'
import Nav from './Nav'
export default function Top() {
    return (
        <div className="bg-red">
            <Head>
                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="description" content="Noticias, Investigación, Comunitario, Comunidad Conciencia, Educación" />
                <link rel="icon" href="/favicon.ico" />
                <title>Marea Ecologista</title>
            </Head>

            <Nav />
        </div>
    )
}
