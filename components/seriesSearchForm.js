import styled from 'styled-components'

const Form = styled.form`
  width: 100%;
`
const Label = styled.label`
    opacity: 0;
    position: absolute;
`

const Input = styled.input`
  width: 100%;
  padding: 5px;
  background: white;
`


export default function SeriesSearchForm({ handleSearchChange }) {
    return (
        <Form>
            <Label htmlFor="search">Start typing to search.</Label>
            <Input onChange={handleSearchChange} id="search" type="text" placeholder="Search..." />
        </Form>
    )
}