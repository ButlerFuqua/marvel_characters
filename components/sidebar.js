import styled from 'styled-components'

import { useState } from 'react'

const Container = styled.div`
    width: 280px;
    border-right: 1px solid #000;
    height: 100%;
    overflow: auto;
    background: #131417;

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
    justify-content: space-between;
    


    transition: .3s;
  }
  & ul li:hover {
    background: #393C49;
  }
  & ul li img {
    margin-right: 2px;
  }
  & ul li.selected {
      background: #393C49;
  }

  &::-webkit-scrollbar {
    width: .5rem;
    background: #393C49
    border: none;
  }
   
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
   
  &::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
    border-radius: 10px;
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
              {item.title}
              <img src={`${item.thumbnail.path.replace('http', 'https')}/standard_small.${item.thumbnail.extension}`} alt={item.title} />
            </li>
          ))}
        </ul>

      </Container>
    </>
  )
}
