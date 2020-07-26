import styled from 'styled-components'

import { useState } from 'react'

const Container = styled.div`
    width: 280px;
    border-right: 1px solid #000;
    height: 100%;
    overflow: auto;

    @media(max-width: 768px){
      position: fixed;
      top: 0;
      width: 100%;
      background: white;
      min-height: 100vh;

      transition: .2s;
      right: 100vw;

      &.shown{
        right: 0
      }
    }
    
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

const MenuToggle = styled.button`
  position: fixed;
  top: 0;
  right: 0;
  font-size: 1.2rem;

  @media(min-width: 769px){
    display: none;
  }
`


export default function Sidebar({ results, onSeriesSelect, selectedSeries }) {

  const [seriesArray, setSeriesArray] = useState(results)
  const [filteredSeries, setFilteredSeries] = useState(results)
  const [menuState, setMenuState] = useState(false)




  const handleSeriesSelect = item => {

    onSeriesSelect(item)

    // Close menu
    setMenuState(false)

    console.log(menuState)
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

      <Container className={menuState ? 'shown' : ''}>
        <MenuToggle onClick={() => setMenuState(!menuState)}>Menu</MenuToggle>

        <Form>
          <label htmlFor="search">Start typing to search.</label>
          <Input onChange={handleSearchChange} id="search" type="text" placeholder="Search..." />
        </Form>
        <ul>
          {filteredSeries.map(item => (
            <li
              className={item.id === selectedSeries.id ? 'selected' : ``}
              onClick={() => handleSeriesSelect(item)}
              key={item.id}>
              {/* <img src={`${item.thumbnail.path}/standard_small.${item.thumbnail.extension}`} alt={item.title} /> */}
              {item.title}
            </li>
          ))}
        </ul>

      </Container>
    </>
  )
}
