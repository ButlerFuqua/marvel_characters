import md5 from 'crypto-js/md5'
import styled from 'styled-components'

const ts = new Date().getTime()
const hash = md5(ts + process.env.PRI_KEY + process.env.PUB_KEY).toString()
const endpoint = `http://gateway.marvel.com/v1/public/`
const params = `?apikey=${process.env.PUB_KEY}&ts=${ts}&hash=${hash}`

import { useState } from 'react'

const Container = styled.div`
    width: 280px;
    border-right: 1px solid #000;
    height: 100%;
    overflow: auto;
    // background: blue;

  & ul {
    padding: 0;
    margin: 0;
  }
  & ul li {
    list-style: none;
    padding: 1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    


    transition: .3s;
  }
  & ul li:hover {
    background: #ccc;
  }
  & ul li img {
    margin-right: 2px;
  }
  & ul li.selected {
      background: #ccc;
  }
`

const Form = styled.form`
  width: 100%;
`

const Input = styled.input`
  width: 100%;
  padding: 5px;
`



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

      <Container>

        <Form>
          <label htmlFor="search">Start typing to search.</label>
          <Input onChange={handleSearchChange} id="search" type="text" placeholder="Search..." />
        </Form>
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

      </Container>

      <style jsx>{`



      

        {/* form {
            width: 100%;
        }
        input[type="text"] {
            width: 100%;
            padding: 5px;
        } */}


      `}</style>


    </>
  )
}
