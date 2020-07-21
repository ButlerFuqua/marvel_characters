import md5 from 'crypto-js/md5'

const ts = new Date().getTime()
const hash = md5(ts + process.env.PRI_KEY + process.env.PUB_KEY).toString()
const endpoint = `http://gateway.marvel.com/v1/public/`
const params = `?apikey=${process.env.PUB_KEY}&ts=${ts}&hash=${hash}`

import { useState } from 'react'



export default function Sidebar({ results, onSeriesSelect, selectedSeries }) {

    const [seriesArray, setSeriesArray] = useState(results)
    const [filteredSeries, setFilteredSeries] = useState(results)



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

            <div id="sidebar">

                <form>
                    <label htmlFor="search">Start typing to search.</label>
                    <input onChange={handleSearchChange} id="search" type="text" placeholder="Search..." />
                </form>
                <ul>
                    {filteredSeries.map(item => (
                        <li
                            className={item.id === selectedSeries.id ? 'selected' : ``}
                            onClick={() => onSeriesSelect(item)}
                            key={item.id}>
                            <img src={`${item.thumbnail.path}/standard_small.${item.thumbnail.extension}`} alt={item.title} />
                            {item.title}
                        </li>
                    ))}
                </ul>

            </div>

            <style jsx>{`



        #sidebar {
          width: 280px;
          border-right: 1px solid #000;
          height: 100%;
          overflow: auto;
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
        #sidebar ul li.selected {
            background: #ccc;
        }

        form {
            width: 100%;
        }
        input[type="text"] {
            width: 100%;
            padding: 5px;
        }


      `}</style>


        </>
    )
}
