import Head from 'next/head'
// import { useState } from 'react'
// import md5 from 'crypto-js/md5'
import Link from 'next/link'
import { charactersResponse } from '../../../fakeapi/characters'


// const ts = new Date().getTime()
// const hash = md5(ts + process.env.PRI_KEY + process.env.PUB_KEY).toString()
// const endpoint = `http://gateway.marvel.com/v1/public/`
// const params = `?apikey=${process.env.PUB_KEY}&ts=${ts}&hash=${hash}`


export async function getServerSideProps({ query }) {


    // const { id } = query

    // // Fetch data from external API
    // const res = await fetch(`${endpoint}characters/${id}${params}`)
    // const data = await res.json()

    // const { results } = data.data

    // Get character from static data
    let results = charactersResponse.data.results.filter(character => character.id === 1009159)


    // 1009159
    // Pass results to the page via props
    return { props: results[0] }

}




export default function CharactersPage({ name, thumbnail }) {





    return (
        <>
            <Head>
                <title>Characters page</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                Characters page
                <br />
                <img src={`${thumbnail.path}/standard_large.${thumbnail.extension}`} alt={name} />
                <br />
                {name}
                <br />
                <Link href="/" as={`/`}>
                    <a> Back</a>
                </Link>

            </main>

            <footer>
                footer
        </footer>

        </>
    )
}
