import Head from 'next/head'
// import { useState } from 'react'
// import md5 from 'crypto-js/md5'
import Link from 'next/link'
import { charactersResponse } from '../../../fakeapi/characters'
import Layout from '../../../components/layout'
import styled from 'styled-components'

const Main = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    width: 100%;
    max-width: 900px;
    margin: auto;
    border: 2px solid ${({ theme }) => theme.colors.primary};
    border-top: none;
    border-bottom: none;
`
const NameTitle = styled.h1`
    color:  ${({ theme }) => theme.colors.primary};
`
const P = styled.p`
    color: white;
`
const A = styled.a`
    background: ${({ theme }) => theme.colors.primary};
    padding: .5rem 1rem;
    cursor: pointer;

`
export async function getServerSideProps({ query }) {

    // Get character from static data
    let results = charactersResponse.data.results.filter(character => character.id === 1009159)

    // Pass results to the page via props
    return { props: results[0] }

}


export default function CharactersPage({ name, thumbnail, description }) {

    return (
        <Layout>
            <Main>
                <img src={`${thumbnail.path.replace('http', 'https')}/standard_large.${thumbnail.extension}`} alt={name} />
                <NameTitle>{name}</NameTitle>
                <P>{description === '' ? 'No description available' : description}</P>
                <Link href="/" as={`/`}>
                    <A> Back</A>
                </Link>
            </Main>
        </Layout>
    )
}
