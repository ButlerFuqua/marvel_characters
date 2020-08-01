import styled from 'styled-components'
import Layout from '../components/layout'


import { seriesResponse } from '../fakeapi/series'
import { charactersResponse } from '../fakeapi/characters'


import { useState } from 'react'
import Link from 'next/link'

import Sidebar from '../components/sidebar'


export async function getServerSideProps(context) {

  // Fetch data from fake api
  let results = seriesResponse.data.results

  // Remove serires that don't have characters
  results = results.filter(result => result.characters.available)
  // Remove series that don't have an image
  results = results.filter(result => result.thumbnail.path.indexOf('not_available') == -1)

  // Pass results to the page via props
  return { props: { results } }

}

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`
const PageContent = styled.div`
  flex: 1;
  height: 100%;
  overflow: auto;
`

const Main = styled.main`
  overflow: auto;
  padding-bottom: 1rem;

  & ul {
    padding: 0;
    margin: 0;
    min-height: 100vh;
    overflow-x: hidden;
    display: flex;
    flex-wrap: wrap;
  }
  & ul li {
    list-style: none;
    padding: 1rem;
    width: 18rem;
    max-width:90%;
    margin: 1rem auto;
    text-align: center;
    border: 2px solid #393C49;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;


    transition: .3s;
  }
  & ul li:hover{
   border: 2px solid #A055BF;
  } 

  & ul li.selected {
    background: #222;
    color: #f1f1f1;
  }

  & ul li img {
    width: 10rem;
    max-width: 100%;
  }


  & form{
    padding: 1rem;

  }
`

const Footer = styled.footer`
  background: #333;
  color: #ccc;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Input = styled.input`
  width: 100%;
  padding: 5px;
  font-size: 16px;
  margin-top: 5px;
  color: #333;
`

export default function Home({ results }) {

  const [selectedSeries, setSelectedSeries] = useState({})
  const [characters, setCharacters] = useState([])
  const [filteredCharacters, setFilteredCharacters] = useState(characters)


  const handleSearchChange = ({ target }) => {

    // get value
    let { value } = target

    // filter based on value
    let newFilteredCharacters = [...characters]
    newFilteredCharacters = newFilteredCharacters.filter(item => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1)

    // Change array
    setFilteredCharacters(newFilteredCharacters)
  }

  const handleSeriesSelect = async series => {


    // // Get specific series's characters
    // const res = await fetch(`${endpoint}series/${series.id}/characters${params}`)
    // const data = await res.json()
    // const { results } = data.data



    // Fetch data from fake api
    let results = charactersResponse.data.results

    // set characters
    setCharacters(results)
    setFilteredCharacters(results)
    // Show selection in UI if it isn't already selected
    if (series.id !== selectedSeries.id)
      setSelectedSeries(series)
    // Clear selected series if the same one is selected
    else setSelectedSeries({})

  }


  return (
    <Layout>

      <Wrapper>

        <Sidebar
          results={results}
          onSeriesSelect={handleSeriesSelect}
          selectedSeries={selectedSeries}
        />

        <PageContent id="page_content">
          <Main>
            <form>
              <label htmlFor="search">Start typing to search.</label>
              <Input onChange={handleSearchChange} id="search" type="text" placeholder="Search..." />
            </form>
            <ul>
              {filteredCharacters.length ? filteredCharacters.map(item => (
                <li key={item.id}>
                  <img src={`${item.thumbnail.path.replace('http', 'https')}/standard_large.${item.thumbnail.extension}`} alt={item.name} />
                  <Link href="/characters/[id]" as={`/characters/${item.id}`}>
                    <a style={{ color: '#A055BF', fontSize: '20px', marginTop: '1rem', textDecoration: 'none' }}>{item.name}</a>
                  </Link>
                </li>
              ))
                :
                <div className="full_center">
                  <p>Please select a series from the sidebar.</p>
                </div>
              }
            </ul>
          </Main>

          <Footer>
            Footer
        </Footer>
        </PageContent>
      </Wrapper>


      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-size: 16px;
          color: white;
          font-family: 'Arial';
          background: #131417;
        }


        * {
          box-sizing: border-box;
        }

        .full_center{
          height: 100%;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </Layout>
  )
}
