import styled from 'styled-components'

const Label = styled.label`
    opacity: 0;
    position: absolute;
`

const Input = styled.input`
  width: 100%;
  padding: 5px;
  font-size: 16px;
  margin-top: 1rem;
  color:  ${({ theme }) => theme.colors.light};
  border: none;
  background:  ${({ theme }) => theme.colors.medium};
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary}
`


export default function SearchForm({ handleSearchChange }) {
    return (
        <form>
            <Label htmlFor="search" aria-label="Search Characters">Start typing to search.</Label>
            <Input onChange={handleSearchChange} id="search" type="text" placeholder="Search..." />
        </form>
    )
}