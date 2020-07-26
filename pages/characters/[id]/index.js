import Head from 'next/head'
// import { useState } from 'react'
// import md5 from 'crypto-js/md5'
import Link from 'next/link'
import { charactersResponse } from '../../../fakeapi/characters'
import Layout from '../../../components/layout'

export async function getServerSideProps({ query }) {

    // Get character from static data
    let results = charactersResponse.data.results.filter(character => character.id === 1009159)

    // Pass results to the page via props
    return { props: results[0] }

}


export default function CharactersPage({ name, thumbnail }) {

    return (
        <Layout>
            <main>
                Characters page
                <br />
                {/* <img src={`${thumbnail.path}/standard_large.${thumbnail.extension}`} alt={name} /> */}
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
        </Layout>
    )
}
