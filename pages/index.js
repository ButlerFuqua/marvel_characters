import styled from 'styled-components'
import Layout from '../components/layout'
import CharacterList from '../components/characterList'
import LandingPage from '../components/landingPage'
import SearchForm from '../components/searchForm'


import { seriesResponse } from '../fakeapi/series'
import { charactersResponse } from '../fakeapi/characters'


import { useState } from 'react'

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



export default function Home({ results, theme }) {


  const [selectedSeries, setSelectedSeries] = useState({})
  const [characters, setCharacters] = useState([])
  const [filteredCharacters, setFilteredCharacters] = useState(characters)


  const handleSearchChange = ({ target }) => {

    // get value
    let { value } = target

    // filter based on value
    let newFilteredCharacters = [...characters]
    newFilteredCharacters = newFilteredCharacters.filter(character => character.name.toLowerCase().indexOf(value.toLowerCase()) > -1)

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

        <PageContent>
          <Main>
            <SearchForm handleSearchChange={handleSearchChange} />
            {filteredCharacters.length
              ? <CharacterList filteredCharacters={filteredCharacters} />
              :
              <LandingPage />
            }
          </Main>

          <Footer>
            Footer
        </Footer>
        </PageContent>
      </Wrapper>
    </Layout>
  )
}
