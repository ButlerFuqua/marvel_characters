import Head from 'next/head'
import { useState } from 'react'
import md5 from 'crypto-js/md5'
const ts = new Date().getTime()
const hash = md5(ts + process.env.PRI_KEY + process.env.PUB_KEY).toString()
const endpoint = `http://gateway.marvel.com/v1/public/`
const params = `?apikey=${process.env.PUB_KEY}&ts=${ts}&hash=${hash}`


export async function getServerSideProps({ query }) {


    const { id } = query

    // Fetch data from external API
    const res = await fetch(`${endpoint}series/${id}${params}`)
    const data = await res.json()

    const { results } = data.data


    // Pass results to the page via props
    return { props: results[0] }

}




export default function SeriesPage(props) {


    const { title } = props



    return (
        <>
            <Head>
                <title>Series page</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                Series page
                <br />
                {title}
            </main>

            <footer>
                footer
        </footer>

        </>
    )
}
