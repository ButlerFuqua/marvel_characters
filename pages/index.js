import Head from 'next/head'
import md5 from 'crypto-js/md5'

const ts = new Date().getTime()
const hash = md5(ts + process.env.PRI_KEY + process.env.PUB_KEY).toString()
const endpoint = `http://gateway.marvel.com/v1/public/`
const params = `?apikey=${process.env.PUB_KEY}&ts=${ts}&hash=${hash}`
import { seriesResponse } from '../fakeapi/series'
import { charactersResponse } from '../fakeapi/characters'


import { useState } from 'react'
import Link from 'next/link'

import Sidebar from '../components/sidebar'


export async function getServerSideProps(context) {


  // // Fetch data from external API
  // const res = await fetch(`${endpoint}series${params}&limit=100`)
  // const data = await res.json()

  // let { results } = data.data

  // Fetch data from fake api
  let results = seriesResponse.data.results

  // Remove serires that don't have characters
  results = results.filter(result => result.characters.available)
  // Remove series that don't have an image
  results = results.filter(result => result.thumbnail.path.indexOf('not_available') == -1)

  // Pass results to the page via props
  return { props: { results } }

}




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
    <>
      <Head>
        <title>Marvel Comics and Characters</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div id="wrapper">

        <Sidebar
          results={results}
          onSeriesSelect={handleSeriesSelect}
          selectedSeries={selectedSeries}
        />

        <div id="page_content">
          <main>
            <form>
              <label htmlFor="search">Start typing to search.</label>
              <input onChange={handleSearchChange} id="search" type="text" placeholder="Search..." />
            </form>
            <ul>
              {filteredCharacters.length ? filteredCharacters.map(item => (
                <li key={item.id}>
                  <img src={`${item.thumbnail.path}/standard_large.${item.thumbnail.extension}`} alt={item.name} />
                  <Link href="/characters/[id]" as={`/characters/${item.id}`}>
                    <a>{item.name}</a>
                  </Link>
                </li>
              ))
                :
                <div className="full_center">
                  <p>Please select a series from the sidebar.</p>
                </div>
              }
            </ul>
          </main>

          <footer>
            footer
        </footer>
        </div>
      </div>


      <style jsx>{`


        #wrapper{
          display: flex;
          height: 100vh;
          overflow: hidden;
        }

        #page_content{
          flex: 1;
          height: 100%;
          overflow: auto;
        }

       main {
         overflow: auto;
         padding-bottom: 1rem;
       }

       main ul {
        padding: 0;
        margin: 0;
        min-height: 100vh;
        overflow-x: hidden;
        display: flex;
        flex-wrap: wrap;
       }
       main ul li {
         list-style: none;
         padding: 1rem;
         width: 18rem;
         max-width:90%;
         margin: auto;
         text-align: center;
         border: 2px solid #fff;
         display: flex;
         flex-direction: column;
         justify-content: center;
         align-items: center;


         transition: .3s;
       }
       main ul li:hover{
        border: 2px solid #000;
       } 

       main ul li.selected {
         background: #222;
         color: #f1f1f1;
       }

       main ul li img {
         width: 10rem;
         max-width: 100%;
       }


       main form{
         padding: 1rem;

       }

       label, input[type="text"] {
         width: 100%;
       }
       input[type="text"] {
        padding: 5px;
        font-size: 16px;
        margin-top: 5px;
        color: #333;
       }

       footer{
         background: #333;
         color: #ccc;
         padding: 1rem;
         display: flex;
         align-items: center;
         justify-content: center;
       }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-size: 16px;
          color: #333;
          font-family: 'Arial';
        }


        * {
          box-sizing: border-box;
        }
        img {
          border-radius: 5px;
        }
        .full_center{
          height: 100%;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </>
  )
}
