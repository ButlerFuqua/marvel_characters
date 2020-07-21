import Head from 'next/head'
import md5 from 'crypto-js/md5'

const ts = new Date().getTime()
const hash = md5(ts + process.env.PRI_KEY + process.env.PUB_KEY).toString()
const endpoint = `http://gateway.marvel.com/v1/public/`
const params = `?apikey=${process.env.PUB_KEY}&ts=${ts}&hash=${hash}`

import { useState } from 'react'
import Link from 'next/link'


export async function getServerSideProps(context) {


  // Fetch data from external API
  const res = await fetch(`${endpoint}series${params}&limit=100`)
  const data = await res.json()

  let { results } = data.data

  // Remove serires that don't have characters
  results = results.filter(result => result.characters.available)
  // Remove series that don't have an image
  results = results.filter(result => result.thumbnail.path.indexOf('not_available') == -1)

  // Pass results to the page via props
  return { props: { results } }

}




export default function Home({ results }) {

  const [selectedSeries, setSelectedSeries] = useState({})
  const [seriesArray, setSeriesArray] = useState(results)
  const [filteredSeries, setFilteredSeries] = useState(results)

  const handleSeriesSelect = async series => {

    // Get specific series
    const res = await fetch(`${endpoint}series/${series.id}${params}`)
    const data = await res.json()
    const { results } = data.data

    // Show selection in UI if it isn't already selected
    if (series.id !== selectedSeries.id)
      setSelectedSeries(series)
    // Clear selected series if the same one is selected
    else setSelectedSeries({})

  }

  const handleSearchChange = ({ target }) => {

    // get value
    let { value } = target

    // filter based on value
    let newFilteredSeries = [...seriesArray]
    newFilteredSeries = newFilteredSeries.filter(item => item.title.toLowerCase().indexOf(value.toLowerCase()) > -1)

    // Change array
    setFilteredSeries(newFilteredSeries)
  }


  return (
    <>
      <Head>
        <title>Marvel Comics and Characters</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div id="wrapper">

        <div id="sidebar">
          <form>
            <label htmlFor="search">Start typing to search.</label>
            <input onChange={handleSearchChange} id="search" type="text" placeholder="Search..." />
          </form>
          <ul>
            {filteredSeries.map(item => <li>
              <img src={`${item.thumbnail.path}/standard_small.${item.thumbnail.extension}`} alt={item.title} />
              {item.title}
            </li>)}
          </ul>

        </div>

        <div id="page_content">
          <main>
            <form>
              <label htmlFor="search">Start typing to search.</label>
              <input onChange={handleSearchChange} id="search" type="text" placeholder="Search..." />
            </form>
            <ul>
              {filteredSeries.map(item => (
                <li className={item.id === selectedSeries.id ? 'selected' : ``} onClick={() => handleSeriesSelect(item)} key={item.id}>
                  <img src={`${item.thumbnail.path}/standard_large.${item.thumbnail.extension}`} alt={item.title} />
                  <h4>{item.title}</h4>
                  <Link href="/series/[id]" as={`/series/${item.id}`}>
                    <a>View</a>
                  </Link>
                </li>
              ))}
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
        }

        #sidebar {
          width: 280px;
          border-right: 1px solid #000;
        }
        #sidebar ul {
          padding: 0;
          margin: 0;
        }
        #sidebar ul li {
          list-style: none;
          padding: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;

          transition: .3s;
        }
        #sidebar ul li:hover {
          background: #ccc;
        }
        #sidebar ul li img {
          margin-right: 2px;
        }
        #page_content{
          flex: 1;
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
         cursor: pointer;
         width: 18rem;
         max-width:90%;
         margin: auto;
         text-align: center;
         border: 2px solid #fff;


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
         max-width: 75%;
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
      `}</style>
    </>
  )
}
