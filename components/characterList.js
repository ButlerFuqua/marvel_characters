import Link from 'next/link'
import styled from 'styled-components'

const Ul = styled.ul`
    padding: 0;
    margin: 0;
    min-height: 100vh;
    overflow-x: hidden;
    display: flex;
    flex-wrap: wrap;

  & li {
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
  & li:hover{
   border: 2px solid ${({ theme }) => theme.colors.primary};
  } 

  & li.selected {
    background: #222;
    color: #f1f1f1;
  }

  & li img {
    width: 10rem;
    max-width: 100%;
  }

`

export default function CharacterList({ filteredCharacters }) {
    return (
        <Ul>
            {filteredCharacters.map(item => (
                <li key={item.id}>
                    <img src={`${item.thumbnail.path.replace('http', 'https')}/standard_large.${item.thumbnail.extension}`} alt={item.name} />
                    <Link href="/characters/[id]" as={`/characters/${item.id}`}>
                        <a style={{ color: '#A055BF', fontSize: '20px', marginTop: '1rem', textDecoration: 'none' }}>{item.name}</a>
                    </Link>
                </li>
            ))}
        </Ul>
    )
}